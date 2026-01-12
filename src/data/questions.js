export const questions = [
  {
    id: 'relationship',
    question: 'What is your relationship to this person?',
    type: 'single-choice',
    options: [
      { value: 'partner', label: 'Partner/Spouse' },
      { value: 'parent', label: 'Parent' },
      { value: 'child', label: 'Child' },
      { value: 'sibling', label: 'Sibling' },
      { value: 'friend', label: 'Friend' },
      { value: 'colleague', label: 'Colleague' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'age',
    question: 'What age group are they in?',
    type: 'single-choice',
    options: [
      { value: 'child', label: 'Child (0-12)' },
      { value: 'teen', label: 'Teen (13-19)' },
      { value: 'adult', label: 'Adult (20-59)' },
      { value: 'senior', label: 'Senior (60+)' }
    ]
  },
  {
    id: 'gender',
    question: 'What is their gender?',
    type: 'single-choice',
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'non-binary', label: 'Non-binary' },
      { value: 'prefer-not-to-say', label: 'Prefer not to say' }
    ]
  },
  {
    id: 'occasion',
    question: 'What is the occasion?',
    type: 'single-choice',
    options: [
      { value: 'birthday', label: 'Birthday' },
      { value: 'christmas', label: 'Christmas' },
      { value: 'anniversary', label: 'Anniversary' },
      { value: 'valentine', label: "Valentine's Day" },
      { value: 'mother-day', label: "Mother's Day" },
      { value: 'father-day', label: "Father's Day" },
      { value: 'graduation', label: 'Graduation' },
      { value: 'wedding', label: 'Wedding' },
      { value: 'housewarming', label: 'Housewarming' },
      { value: 'new-year', label: 'New Year' },
      { value: 'just-because', label: 'Just Because' }
    ]
  },
  {
    id: 'interests',
    question: 'What are their main interests? (Select all that apply)',
    type: 'multiple-choice',
    options: [
      { value: 'tech', label: 'Technology & Gadgets' },
      { value: 'reading', label: 'Reading & Books' },
      { value: 'music', label: 'Music' },
      { value: 'art', label: 'Art & Creativity' },
      { value: 'fitness', label: 'Fitness & Health' },
      { value: 'sports', label: 'Sports' },
      { value: 'cooking', label: 'Cooking & Food' },
      { value: 'gaming', label: 'Gaming' },
      { value: 'travel', label: 'Travel' },
      { value: 'fashion', label: 'Fashion' },
      { value: 'outdoor', label: 'Outdoor Activities' },
      { value: 'photography', label: 'Photography' },
      { value: 'pets', label: 'Pets & Animals' },
      { value: 'home-decor', label: 'Home Decor' },
      { value: 'relaxation', label: 'Relaxation & Self-Care' }
    ]
  },
  {
    id: 'budget',
    question: 'What is your budget?',
    type: 'single-choice',
    options: [
      { value: 'low', label: 'Under $30' },
      { value: 'medium', label: '$30 - $100' },
      { value: 'high', label: 'Over $100' }
    ]
  }
];
