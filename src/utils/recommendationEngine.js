import { giftDatabase } from '../data/giftDatabase';

export const getGiftRecommendations = (answers) => {
  const { age, interests, budget, occasion } = answers;

  // Score each gift based on how well it matches the user's answers
  const scoredGifts = giftDatabase.map(gift => {
    let score = 0;

    // Age match (weight: 3)
    if (gift.ageGroup.includes(age)) {
      score += 3;
    }

    // Budget match (weight: 4)
    if (gift.budget === budget) {
      score += 4;
    }

    // Occasion match (weight: 3)
    if (gift.occasions.includes(occasion)) {
      score += 3;
    }

    // Interest match (weight: 2 per match)
    if (interests && interests.length > 0) {
      const matchingInterests = gift.interests.filter(interest =>
        interests.includes(interest)
      );
      score += matchingInterests.length * 2;
    }

    return {
      ...gift,
      score,
      matchingInterests: gift.interests.filter(interest =>
        interests && interests.includes(interest)
      )
    };
  });

  // Sort by score (highest first) and return top recommendations
  const sortedGifts = scoredGifts
    .filter(gift => gift.score > 0) // Only include gifts with at least some match
    .sort((a, b) => b.score - a.score);

  // Return top 10 recommendations, or all if less than 10
  return sortedGifts.slice(0, 10);
};

export const getBudgetLabel = (budget) => {
  const labels = {
    low: 'Under $30',
    medium: '$30 - $100',
    high: 'Over $100'
  };
  return labels[budget] || budget;
};

export const getOccasionLabel = (occasion) => {
  const labels = {
    'birthday': 'Birthday',
    'christmas': 'Christmas',
    'anniversary': 'Anniversary',
    'valentine': "Valentine's Day",
    'mother-day': "Mother's Day",
    'father-day': "Father's Day",
    'graduation': 'Graduation',
    'wedding': 'Wedding',
    'housewarming': 'Housewarming',
    'new-year': 'New Year',
    'just-because': 'Just Because'
  };
  return labels[occasion] || occasion;
};
