# BePresent - Test Plan

## Test Strategy

### Testing Levels
1. **Unit Tests** - Individual functions and utilities
2. **Component Tests** - React components in isolation
3. **Integration Tests** - Component interactions and data flow
4. **E2E Tests** - Full user workflows
5. **Manual Tests** - Visual, UX, and cross-browser testing

### Test Coverage Goals
- **Unit Tests:** 80%+ code coverage
- **Component Tests:** All components tested
- **Integration Tests:** All critical paths covered
- **E2E Tests:** Happy path + major error scenarios

---

## Unit Tests

### recommendationEngine.js

#### Test Suite: getGiftRecommendations()

**TC-U001: Should return empty array when no gifts match**
```javascript
test('returns empty array when no gifts match', () => {
  const answers = {
    age: 'child',
    occasion: 'wedding',
    interests: ['underwater-basket-weaving'],
    budget: 'high'
  };
  const results = getGiftRecommendations(answers);
  expect(results).toEqual([]);
});
```

**TC-U002: Should score age match correctly (3 points)**
```javascript
test('awards 3 points for age match', () => {
  const mockGift = {
    id: 1,
    ageGroup: ['adult'],
    budget: 'low',
    occasions: ['other'],
    interests: ['other']
  };
  const answers = {
    age: 'adult',
    budget: 'high',
    occasion: 'test',
    interests: ['test']
  };
  // Score should be 3 (age match only)
});
```

**TC-U003: Should score budget match correctly (4 points)**
```javascript
test('awards 4 points for budget match', () => {
  const answers = {
    age: 'senior',
    budget: 'medium',
    occasion: 'test',
    interests: ['test']
  };
  // Test with gift that has budget: 'medium'
  // Score should be 4 (budget match only)
});
```

**TC-U004: Should score occasion match correctly (3 points)**
```javascript
test('awards 3 points for occasion match', () => {
  const answers = {
    age: 'senior',
    budget: 'low',
    occasion: 'birthday',
    interests: ['test']
  };
  // Test with gift that has occasions: ['birthday']
  // Score should be 3 (occasion match only)
});
```

**TC-U005: Should score interest matches correctly (2 points each)**
```javascript
test('awards 2 points per matching interest', () => {
  const answers = {
    age: 'senior',
    budget: 'low',
    occasion: 'test',
    interests: ['music', 'reading', 'art']
  };
  // Test with gift that has interests: ['music', 'reading']
  // Score should be 4 (2 interests × 2 points)
});
```

**TC-U006: Should calculate cumulative score correctly**
```javascript
test('calculates total score from all factors', () => {
  const answers = {
    age: 'adult',
    budget: 'medium',
    occasion: 'birthday',
    interests: ['music', 'tech']
  };
  // Gift matches all: age(3) + budget(4) + occasion(3) + interests(4) = 14
});
```

**TC-U007: Should return maximum 10 results**
```javascript
test('returns max 10 results even if more match', () => {
  const answers = {
    age: 'adult',
    budget: 'medium',
    occasion: 'birthday',
    interests: ['music', 'reading']
  };
  const results = getGiftRecommendations(answers);
  expect(results.length).toBeLessThanOrEqual(10);
});
```

**TC-U008: Should sort results by score descending**
```javascript
test('sorts results by score in descending order', () => {
  const results = getGiftRecommendations(mockAnswers);
  for (let i = 0; i < results.length - 1; i++) {
    expect(results[i].score).toBeGreaterThanOrEqual(results[i + 1].score);
  }
});
```

**TC-U009: Should include matchingInterests in results**
```javascript
test('includes array of matching interests', () => {
  const answers = {
    interests: ['music', 'tech', 'reading']
  };
  const results = getGiftRecommendations(answers);
  expect(results[0]).toHaveProperty('matchingInterests');
  expect(Array.isArray(results[0].matchingInterests)).toBe(true);
});
```

**TC-U010: Should handle multiple interests correctly**
```javascript
test('handles multiple selected interests', () => {
  const answers = {
    interests: ['music', 'tech', 'fitness', 'reading', 'art']
  };
  const results = getGiftRecommendations(answers);
  expect(results.length).toBeGreaterThan(0);
});
```

#### Test Suite: getBudgetLabel()

**TC-U011: Should return correct label for low budget**
```javascript
test('returns "Under $30" for low', () => {
  expect(getBudgetLabel('low')).toBe('Under $30');
});
```

**TC-U012: Should return correct label for medium budget**
```javascript
test('returns "$30 - $100" for medium', () => {
  expect(getBudgetLabel('medium')).toBe('$30 - $100');
});
```

**TC-U013: Should return correct label for high budget**
```javascript
test('returns "Over $100" for high', () => {
  expect(getBudgetLabel('high')).toBe('Over $100');
});
```

**TC-U014: Should return input for unknown budget**
```javascript
test('returns input for unknown budget value', () => {
  expect(getBudgetLabel('unknown')).toBe('unknown');
});
```

#### Test Suite: getOccasionLabel()

**TC-U015: Should format single-word occasions**
```javascript
test('capitalizes single word occasions', () => {
  expect(getOccasionLabel('birthday')).toBe('Birthday');
  expect(getOccasionLabel('christmas')).toBe('Christmas');
});
```

**TC-U016: Should format hyphenated occasions**
```javascript
test('formats hyphenated occasions with apostrophes', () => {
  expect(getOccasionLabel('mother-day')).toBe("Mother's Day");
  expect(getOccasionLabel('father-day')).toBe("Father's Day");
});
```

**TC-U017: Should handle special cases**
```javascript
test('handles special occasion formatting', () => {
  expect(getOccasionLabel('valentine')).toBe("Valentine's Day");
  expect(getOccasionLabel('new-year')).toBe('New Year');
  expect(getOccasionLabel('just-because')).toBe('Just Because');
});
```

---

## Component Tests

### GiftFinderForm Component

**TC-C001: Should render first question on mount**
```javascript
test('renders first question on mount', () => {
  render(<GiftFinderForm onComplete={jest.fn()} />);
  expect(screen.getByText(/what is your relationship/i)).toBeInTheDocument();
});
```

**TC-C002: Should display progress bar**
```javascript
test('displays progress bar', () => {
  render(<GiftFinderForm onComplete={jest.fn()} />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});
```

**TC-C003: Should show question counter**
```javascript
test('shows question counter (1 of 6)', () => {
  render(<GiftFinderForm onComplete={jest.fn()} />);
  expect(screen.getByText(/question 1 of 6/i)).toBeInTheDocument();
});
```

**TC-C004: Should disable Next button initially**
```javascript
test('Next button is disabled when no answer selected', () => {
  render(<GiftFinderForm onComplete={jest.fn()} />);
  const nextButton = screen.getByRole('button', { name: /next/i });
  expect(nextButton).toBeDisabled();
});
```

**TC-C005: Should enable Next button after selection**
```javascript
test('enables Next button when answer is selected', () => {
  render(<GiftFinderForm onComplete={jest.fn()} />);
  const option = screen.getByText(/partner/i);
  fireEvent.click(option);
  const nextButton = screen.getByRole('button', { name: /next/i });
  expect(nextButton).not.toBeDisabled();
});
```

**TC-C006: Should disable Back button on first question**
```javascript
test('Back button is disabled on first question', () => {
  render(<GiftFinderForm onComplete={jest.fn()} />);
  const backButton = screen.getByRole('button', { name: /back/i });
  expect(backButton).toBeDisabled();
});
```

**TC-C007: Should advance to next question**
```javascript
test('advances to next question when Next is clicked', () => {
  render(<GiftFinderForm onComplete={jest.fn()} />);
  // Select answer
  fireEvent.click(screen.getByText(/partner/i));
  // Click Next
  fireEvent.click(screen.getByRole('button', { name: /next/i }));
  // Check for question 2
  expect(screen.getByText(/what age group/i)).toBeInTheDocument();
});
```

**TC-C008: Should go back to previous question**
```javascript
test('returns to previous question when Back is clicked', () => {
  render(<GiftFinderForm onComplete={jest.fn()} />);
  // Navigate to question 2
  fireEvent.click(screen.getByText(/partner/i));
  fireEvent.click(screen.getByRole('button', { name: /next/i }));
  // Go back
  fireEvent.click(screen.getByRole('button', { name: /back/i }));
  // Check we're back on question 1
  expect(screen.getByText(/what is your relationship/i)).toBeInTheDocument();
});
```

**TC-C009: Should preserve answers when going back**
```javascript
test('preserves selected answers when navigating back', () => {
  render(<GiftFinderForm onComplete={jest.fn()} />);
  const partnerOption = screen.getByText(/partner/i);
  fireEvent.click(partnerOption);
  fireEvent.click(screen.getByRole('button', { name: /next/i }));
  fireEvent.click(screen.getByRole('button', { name: /back/i }));
  expect(partnerOption).toHaveClass('selected');
});
```

**TC-C010: Should update progress bar**
```javascript
test('updates progress bar as user advances', () => {
  render(<GiftFinderForm onComplete={jest.fn()} />);
  const progressBar = screen.getByRole('progressbar');
  const initialWidth = progressBar.style.width;
  // Advance to next question
  fireEvent.click(screen.getByText(/partner/i));
  fireEvent.click(screen.getByRole('button', { name: /next/i }));
  expect(progressBar.style.width).not.toBe(initialWidth);
});
```

**TC-C011: Should allow multiple selections for interests**
```javascript
test('allows multiple interests to be selected', () => {
  // Navigate to interests question (question 5)
  // Select multiple interests
  // Verify all are selected
});
```

**TC-C012: Should show "Find Gifts" on last question**
```javascript
test('shows "Find Gifts" button on last question', () => {
  // Navigate to question 6
  render(<GiftFinderForm onComplete={jest.fn()} />);
  // Navigate through all questions...
  expect(screen.getByRole('button', { name: /find gifts/i })).toBeInTheDocument();
});
```

**TC-C013: Should call onComplete with answers**
```javascript
test('calls onComplete callback with user answers', () => {
  const mockOnComplete = jest.fn();
  render(<GiftFinderForm onComplete={mockOnComplete} />);
  // Answer all questions...
  fireEvent.click(screen.getByRole('button', { name: /find gifts/i }));
  expect(mockOnComplete).toHaveBeenCalledWith(expect.objectContaining({
    relationship: expect.any(String),
    age: expect.any(String),
    interests: expect.any(Array),
    budget: expect.any(String)
  }));
});
```

### ResultsPage Component

**TC-C014: Should render search summary**
```javascript
test('displays search summary with budget and occasion', () => {
  const mockAnswers = { budget: 'medium', occasion: 'birthday' };
  render(<ResultsPage recommendations={[]} answers={mockAnswers} onRestart={jest.fn()} />);
  expect(screen.getByText(/\$30 - \$100/i)).toBeInTheDocument();
  expect(screen.getByText(/birthday/i)).toBeInTheDocument();
});
```

**TC-C015: Should render gift cards**
```javascript
test('renders gift cards for each recommendation', () => {
  const mockRecs = [
    { id: 1, name: 'Gift 1', score: 10, matchingInterests: [] },
    { id: 2, name: 'Gift 2', score: 8, matchingInterests: [] }
  ];
  render(<ResultsPage recommendations={mockRecs} answers={{}} onRestart={jest.fn()} />);
  expect(screen.getByText('Gift 1')).toBeInTheDocument();
  expect(screen.getByText('Gift 2')).toBeInTheDocument();
});
```

**TC-C016: Should display gift rank numbers**
```javascript
test('displays rank numbers (#1, #2, etc.)', () => {
  const mockRecs = [{ id: 1, name: 'Gift 1', score: 10, matchingInterests: [] }];
  render(<ResultsPage recommendations={mockRecs} answers={{}} onRestart={jest.fn()} />);
  expect(screen.getByText('#1')).toBeInTheDocument();
});
```

**TC-C017: Should show match score**
```javascript
test('displays match score for each gift', () => {
  const mockRecs = [{ id: 1, name: 'Gift', score: 12, matchingInterests: [] }];
  render(<ResultsPage recommendations={mockRecs} answers={{}} onRestart={jest.fn()} />);
  expect(screen.getByText(/12\/15/i)).toBeInTheDocument();
});
```

**TC-C018: Should display matching interests**
```javascript
test('displays matching interests as tags', () => {
  const mockRecs = [{
    id: 1,
    name: 'Gift',
    score: 10,
    matchingInterests: ['music', 'tech']
  }];
  render(<ResultsPage recommendations={mockRecs} answers={{}} onRestart={jest.fn()} />);
  expect(screen.getByText('music')).toBeInTheDocument();
  expect(screen.getByText('tech')).toBeInTheDocument();
});
```

**TC-C019: Should show no results message**
```javascript
test('displays no results message when empty', () => {
  render(<ResultsPage recommendations={[]} answers={{}} onRestart={jest.fn()} />);
  expect(screen.getByText(/no gifts found/i)).toBeInTheDocument();
});
```

**TC-C020: Should call onRestart when button clicked**
```javascript
test('calls onRestart when "Find Another Gift" is clicked', () => {
  const mockRestart = jest.fn();
  render(<ResultsPage recommendations={[]} answers={{}} onRestart={mockRestart} />);
  fireEvent.click(screen.getByRole('button', { name: /start new search/i }));
  expect(mockRestart).toHaveBeenCalled();
});
```

### App Component

**TC-C021: Should render welcome screen initially**
```javascript
test('renders welcome screen on mount', () => {
  render(<App />);
  expect(screen.getByText(/BePresent/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
});
```

**TC-C022: Should transition to form**
```javascript
test('transitions to form when Get Started is clicked', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /get started/i }));
  expect(screen.getByText(/what is your relationship/i)).toBeInTheDocument();
});
```

**TC-C023: Should show results after completing form**
```javascript
test('shows results after completing questionnaire', () => {
  // Complete full flow...
});
```

**TC-C024: Should reset on restart**
```javascript
test('returns to welcome screen on restart', () => {
  // Navigate to results, click restart
  // Verify back at welcome screen
});
```

---

## Integration Tests

### INT-001: Complete Happy Path Flow
**Steps:**
1. Load app
2. Click "Get Started"
3. Answer all 6 questions with valid selections
4. Verify results are displayed
5. Verify recommendations are relevant to answers
6. Click "Find Another Gift"
7. Verify back at welcome screen

**Expected:** All steps complete without errors, recommendations match criteria

---

### INT-002: Navigation Back and Forth
**Steps:**
1. Start questionnaire
2. Answer questions 1-3
3. Navigate back to question 1
4. Verify answers are preserved
5. Navigate forward again
6. Complete questionnaire

**Expected:** Answers persist, navigation works smoothly

---

### INT-003: Multiple Interest Selection
**Steps:**
1. Navigate to interests question
2. Select 5 different interests
3. Complete questionnaire
4. Verify results include gifts matching multiple interests
5. Verify score reflects interest matches

**Expected:** Recommendations prioritize gifts matching multiple interests

---

### INT-004: Edge Case - No Results
**Steps:**
1. Select very specific/rare combination:
   - Age: Child
   - Budget: High
   - Interests: Photography, Pets only
   - Occasion: Wedding
2. Complete questionnaire

**Expected:** "No results" message displayed gracefully

---

### INT-005: Progressive Web App Installation
**Steps:**
1. Open app in Chrome on mobile
2. Wait for install prompt
3. Install app
4. Open from home screen
5. Verify app works offline

**Expected:** App installs and functions offline

---

## End-to-End Tests

### E2E-001: First-Time User Journey
```javascript
describe('First-time user completes gift search', () => {
  it('should find gift recommendations', () => {
    cy.visit('/');
    cy.contains('Get Started').click();

    // Answer questions
    cy.contains('Friend').click();
    cy.contains('Next').click();

    cy.contains('Adult (20-59)').click();
    cy.contains('Next').click();

    cy.contains('Female').click();
    cy.contains('Next').click();

    cy.contains('Birthday').click();
    cy.contains('Next').click();

    cy.contains('Music').click();
    cy.contains('Reading').click();
    cy.contains('Next').click();

    cy.contains('$30 - $100').click();
    cy.contains('Find Gifts').click();

    // Verify results
    cy.contains('Perfect Gift Ideas');
    cy.get('.gift-card').should('have.length.greaterThan', 0);
  });
});
```

---

### E2E-002: Restart Search Flow
```javascript
describe('User restarts search', () => {
  it('should clear previous answers and start fresh', () => {
    // Complete first search
    // Click "Find Another Gift"
    // Verify back at welcome
    // Start new search with different answers
    // Verify different results
  });
});
```

---

## Manual Testing Checklist

### Visual Testing
- [ ] All text is readable on white and colored backgrounds
- [ ] Buttons have clear hover states
- [ ] Selected options are visually distinct
- [ ] Progress bar animates smoothly
- [ ] Gift cards have consistent styling
- [ ] Match score bars are visually clear

### Responsive Testing
- [ ] iPhone SE (375px)
- [ ] iPhone 12 Pro (390px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop 1920px
- [ ] Test portrait and landscape orientations

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Chrome Android
- [ ] Safari iOS

### Accessibility Testing
- [ ] Tab through entire app with keyboard
- [ ] All interactive elements focusable
- [ ] Focus indicators visible
- [ ] Screen reader announces all content
- [ ] Color contrast passes WCAG AA
- [ ] Works with 200% zoom
- [ ] Works with browser dark mode

### Performance Testing
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] No layout shifts
- [ ] Smooth animations (60fps)
- [ ] Bundle size < 500KB gzipped

### PWA Testing
- [ ] Install prompt appears
- [ ] App installs successfully
- [ ] Launches in standalone mode
- [ ] Works offline after first visit
- [ ] Service worker caches assets
- [ ] Updates automatically

---

## Bug Reporting Template

```markdown
**Bug ID:** BUG-XXX
**Severity:** Critical | High | Medium | Low
**Priority:** P1 | P2 | P3

**Environment:**
- Browser:
- OS:
- Device:

**Steps to Reproduce:**
1.
2.
3.

**Expected Result:**

**Actual Result:**

**Screenshots/Video:**

**Additional Notes:**
```

---

## Test Metrics

### Coverage Goals
- **Line Coverage:** > 80%
- **Branch Coverage:** > 75%
- **Function Coverage:** > 85%

### Quality Gates
- All tests must pass before merge
- No regression in test coverage
- Lighthouse scores maintained
- Zero console errors in production

---

## Continuous Integration

### Pre-Commit
- Run linter
- Run unit tests
- Check formatting

### Pull Request
- Run all tests
- Check test coverage
- Build production bundle
- Run Lighthouse audit

### Deploy
- Run E2E tests on staging
- Verify PWA functionality
- Check production bundle size
- Monitor error rates
