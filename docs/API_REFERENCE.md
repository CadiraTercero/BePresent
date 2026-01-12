# BePresent - API Reference

## Overview

BePresent is a client-side only application with no backend APIs. This document describes the internal JavaScript APIs, data structures, and functions used throughout the application.

---

## Data Structures

### Gift

Represents a single gift item in the database.

```typescript
interface Gift {
  id: number;
  name: string;
  category: string;
  interests: string[];
  ageGroup: ('child' | 'teen' | 'adult' | 'senior')[];
  budget: 'low' | 'medium' | 'high';
  occasions: string[];
}
```

**Example:**
```javascript
{
  id: 1,
  name: "Wireless Earbuds",
  category: "tech",
  interests: ["music", "tech", "fitness"],
  ageGroup: ["teen", "adult"],
  budget: "medium",
  occasions: ["birthday", "christmas", "graduation"]
}
```

---

### Question

Represents a single question in the questionnaire.

```typescript
interface QuestionOption {
  value: string;
  label: string;
}

interface Question {
  id: string;
  question: string;
  type: 'single-choice' | 'multiple-choice';
  options: QuestionOption[];
}
```

**Example:**
```javascript
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
}
```

---

### UserAnswers

Represents the user's answers to the questionnaire.

```typescript
interface UserAnswers {
  relationship?: string;
  age: 'child' | 'teen' | 'adult' | 'senior';
  gender?: string;
  occasion: string;
  interests: string[];
  budget: 'low' | 'medium' | 'high';
}
```

**Example:**
```javascript
{
  relationship: 'friend',
  age: 'adult',
  gender: 'female',
  occasion: 'birthday',
  interests: ['music', 'fitness', 'reading'],
  budget: 'medium'
}
```

---

### RecommendationResult

Represents a gift with calculated recommendation score.

```typescript
interface RecommendationResult extends Gift {
  score: number;
  matchingInterests: string[];
}
```

**Example:**
```javascript
{
  id: 1,
  name: "Wireless Earbuds",
  category: "tech",
  interests: ["music", "tech", "fitness"],
  ageGroup: ["teen", "adult"],
  budget: "medium",
  occasions: ["birthday", "christmas", "graduation"],
  score: 11,
  matchingInterests: ["music", "fitness"]
}
```

---

## Core Functions

### getGiftRecommendations

Calculates personalized gift recommendations based on user answers.

```typescript
function getGiftRecommendations(answers: UserAnswers): RecommendationResult[]
```

**Parameters:**
- `answers` (UserAnswers): The complete set of user responses from the questionnaire

**Returns:**
- Array of RecommendationResult objects, sorted by score (descending)
- Maximum of 10 results
- Only includes gifts with score > 0

**Scoring Algorithm:**

1. **Age Match (3 points)**
   - Award 3 points if the gift's `ageGroup` array includes the user's selected `age`

2. **Budget Match (4 points)**
   - Award 4 points if the gift's `budget` exactly matches the user's selected `budget`

3. **Occasion Match (3 points)**
   - Award 3 points if the gift's `occasions` array includes the user's selected `occasion`

4. **Interest Matches (2 points each)**
   - Award 2 points for each interest that appears in both the gift's `interests` array and the user's selected `interests` array
   - Maximum possible: 2 × number of matching interests

**Maximum Possible Score:** 15 points
- Age match: 3
- Budget match: 4
- Occasion match: 3
- Interest matches: Variable (typically 2-4 points)

**Example Usage:**
```javascript
const answers = {
  age: 'adult',
  occasion: 'birthday',
  interests: ['music', 'tech', 'fitness'],
  budget: 'medium'
};

const recommendations = getGiftRecommendations(answers);
console.log(recommendations);
// Returns array of up to 10 gifts sorted by score
```

**Example Output:**
```javascript
[
  {
    id: 1,
    name: "Wireless Earbuds",
    score: 11,
    matchingInterests: ["music", "tech", "fitness"],
    // ... other gift properties
  },
  {
    id: 12,
    name: "Fitness Tracker",
    score: 9,
    matchingInterests: ["fitness", "tech"],
    // ... other gift properties
  }
  // ... up to 8 more results
]
```

**Edge Cases:**
- If no gifts match (all scores are 0), returns empty array
- If fewer than 10 gifts have score > 0, returns only matching gifts
- Ties in score maintain database order

---

### getBudgetLabel

Converts budget code to human-readable label.

```typescript
function getBudgetLabel(budget: 'low' | 'medium' | 'high'): string
```

**Parameters:**
- `budget` (string): Budget tier code

**Returns:**
- Human-readable budget range string

**Mapping:**
- `'low'` → `'Under $30'`
- `'medium'` → `'$30 - $100'`
- `'high'` → `'Over $100'`
- Unknown value → returns input unchanged

**Example Usage:**
```javascript
getBudgetLabel('low');    // "Under $30"
getBudgetLabel('medium'); // "$30 - $100"
getBudgetLabel('high');   // "Over $100"
```

---

### getOccasionLabel

Converts occasion code to human-readable label.

```typescript
function getOccasionLabel(occasion: string): string
```

**Parameters:**
- `occasion` (string): Occasion code (kebab-case)

**Returns:**
- Formatted occasion label (Title Case)

**Mapping:**
- `'birthday'` → `'Birthday'`
- `'christmas'` → `'Christmas'`
- `'anniversary'` → `'Anniversary'`
- `'valentine'` → `"Valentine's Day"`
- `'mother-day'` → `"Mother's Day"`
- `'father-day'` → `"Father's Day"`
- `'graduation'` → `'Graduation'`
- `'wedding'` → `'Wedding'`
- `'housewarming'` → `'Housewarming'`
- `'new-year'` → `'New Year'`
- `'just-because'` → `'Just Because'`
- Unknown value → returns input unchanged

**Example Usage:**
```javascript
getOccasionLabel('birthday');    // "Birthday"
getOccasionLabel('mother-day');  // "Mother's Day"
getOccasionLabel('valentine');   // "Valentine's Day"
```

---

## Component APIs

### GiftFinderForm

Main questionnaire component.

**Props:**
```typescript
interface GiftFinderFormProps {
  onComplete: (answers: UserAnswers) => void;
}
```

**Behavior:**
- Displays multi-step form with progress indicator
- Validates answers before allowing progression
- Supports back/forward navigation
- Calls `onComplete` when final question is submitted

**Example Usage:**
```jsx
<GiftFinderForm onComplete={(answers) => {
  console.log('User answers:', answers);
  // Process answers and show results
}} />
```

---

### ResultsPage

Displays gift recommendations.

**Props:**
```typescript
interface ResultsPageProps {
  recommendations: RecommendationResult[];
  answers: UserAnswers;
  onRestart: () => void;
}
```

**Behavior:**
- Displays search summary based on answers
- Shows gift grid with rankings and scores
- Handles empty results state
- Calls `onRestart` when user wants new search

**Example Usage:**
```jsx
<ResultsPage
  recommendations={recommendations}
  answers={userAnswers}
  onRestart={() => {
    // Reset app state
    setStage('welcome');
  }}
/>
```

---

## Data Files

### giftDatabase.js

**Location:** `src/data/giftDatabase.js`

**Export:**
```javascript
export const giftDatabase = [Gift, ...]
```

**Description:**
- Array of 50+ gift objects
- Each gift follows the Gift interface
- Covers diverse categories, ages, budgets, and interests

**Adding New Gifts:**
```javascript
{
  id: 51, // Use next available ID
  name: "Gift Name",
  category: "category-name",
  interests: ["interest1", "interest2"],
  ageGroup: ["adult"], // or ["child", "teen", "adult", "senior"]
  budget: "medium", // "low", "medium", or "high"
  occasions: ["birthday", "christmas"]
}
```

---

### questions.js

**Location:** `src/data/questions.js`

**Export:**
```javascript
export const questions = [Question, ...]
```

**Description:**
- Array of 6 question objects in order
- Defines questionnaire flow
- Each question follows the Question interface

**Question Order:**
1. Relationship (single-choice)
2. Age (single-choice)
3. Gender (single-choice)
4. Occasion (single-choice)
5. Interests (multiple-choice)
6. Budget (single-choice)

**Modifying Questions:**
```javascript
{
  id: 'unique-id',
  question: 'Your question text?',
  type: 'single-choice', // or 'multiple-choice'
  options: [
    { value: 'option1', label: 'Option 1 Display' },
    { value: 'option2', label: 'Option 2 Display' }
  ]
}
```

---

## State Management

### App State

The main App component manages global state using React hooks.

```typescript
interface AppState {
  stage: 'welcome' | 'form' | 'results';
  answers: UserAnswers | null;
  recommendations: RecommendationResult[];
}
```

**State Transitions:**
- `welcome` → `form`: User clicks "Get Started"
- `form` → `results`: User completes questionnaire
- `results` → `welcome`: User clicks "Find Another Gift"

---

## Constants

### Budget Values
```javascript
const BUDGET_VALUES = ['low', 'medium', 'high'];
```

### Age Groups
```javascript
const AGE_GROUPS = ['child', 'teen', 'adult', 'senior'];
```

### Interest Categories
```javascript
const INTERESTS = [
  'tech', 'reading', 'music', 'art', 'fitness', 'sports',
  'cooking', 'gaming', 'travel', 'fashion', 'outdoor',
  'photography', 'pets', 'home-decor', 'relaxation'
];
```

### Scoring Weights
```javascript
const SCORE_WEIGHTS = {
  AGE_MATCH: 3,
  BUDGET_MATCH: 4,
  OCCASION_MATCH: 3,
  INTEREST_MATCH: 2
};
```

---

## Error Handling

### Validation Errors

The app validates user input but does not throw errors. Instead:

- Disable "Next" button until question is answered
- Prevent form submission with incomplete data
- Show appropriate UI feedback

### Edge Cases

1. **No Recommendations:** Display "no results" message
2. **Missing Data:** Required fields enforced by UI
3. **Invalid Input:** Prevented by controlled components

---

## Testing Utilities

### Mock Data

**Mock Answers:**
```javascript
const mockAnswers = {
  relationship: 'friend',
  age: 'adult',
  gender: 'female',
  occasion: 'birthday',
  interests: ['music', 'reading'],
  budget: 'medium'
};
```

**Mock Gift:**
```javascript
const mockGift = {
  id: 999,
  name: "Test Gift",
  category: "test",
  interests: ["music"],
  ageGroup: ["adult"],
  budget: "medium",
  occasions: ["birthday"]
};
```

---

## Best Practices

### Adding Gifts
1. Use next available ID
2. Include at least 2 interests
3. Cover at least 2 occasions
4. Assign appropriate age groups
5. Set realistic budget tier

### Modifying Scoring
1. Update `SCORE_WEIGHTS` constants
2. Adjust algorithm in `getGiftRecommendations`
3. Update documentation
4. Test with various answer combinations

### Performance
1. Keep gift database under 200 items
2. Avoid complex calculations in render
3. Memoize expensive computations
4. Use React.memo for components

---

## Version History

**v1.0.0** - Initial release
- Core recommendation engine
- 50+ curated gifts
- 6-question questionnaire
- PWA functionality
