# BePresent - Gift Finder PWA Specifications

## Project Overview

**Project Name:** BePresent - Gift Finder PWA
**Version:** 1.0.0
**Purpose:** Help users discover personalized gift ideas through a guided questionnaire
**Type:** Progressive Web Application (PWA)
**Target Audience:** Anyone looking for gift ideas for friends, family, colleagues, or loved ones

## Core Requirements

### Functional Requirements

#### FR-1: User Onboarding
- **FR-1.1** Display welcome screen with app branding and description
- **FR-1.2** Provide "Get Started" button to begin questionnaire
- **FR-1.3** Welcome screen must be responsive on all device sizes

#### FR-2: Multi-Step Questionnaire
- **FR-2.1** Present 6 sequential questions to gather gift recipient information
- **FR-2.2** Display progress indicator showing current question number and total
- **FR-2.3** Support single-choice questions (radio button behavior)
- **FR-2.4** Support multiple-choice questions (checkbox behavior)
- **FR-2.5** Validate that each question is answered before proceeding
- **FR-2.6** Allow users to navigate back to previous questions
- **FR-2.7** Disable "Next" button until current question is answered
- **FR-2.8** Change final button text to "Find Gifts" on last question

#### FR-3: Question Types
- **FR-3.1** Relationship Question: Single choice from 7 options (partner, parent, child, sibling, friend, colleague, other)
- **FR-3.2** Age Group Question: Single choice from 4 options (child 0-12, teen 13-19, adult 20-59, senior 60+)
- **FR-3.3** Gender Question: Single choice from 4 options (male, female, non-binary, prefer not to say)
- **FR-3.4** Occasion Question: Single choice from 11 options (birthday, christmas, anniversary, valentine's, mother's day, father's day, graduation, wedding, housewarming, new year, just because)
- **FR-3.5** Interests Question: Multiple choice from 15 options (technology, reading, music, art, fitness, sports, cooking, gaming, travel, fashion, outdoor, photography, pets, home-decor, relaxation)
- **FR-3.6** Budget Question: Single choice from 3 options (under $30, $30-$100, over $100)

#### FR-4: Gift Recommendation Engine
- **FR-4.1** Process user answers to generate personalized recommendations
- **FR-4.2** Score each gift based on multiple criteria
- **FR-4.3** Return top 10 highest-scoring gifts
- **FR-4.4** Handle cases where fewer than 10 gifts match criteria
- **FR-4.5** Display "no results" message if no gifts match

#### FR-5: Scoring Algorithm
- **FR-5.1** Age Match: Award 3 points if gift's age group includes user's selection
- **FR-5.2** Budget Match: Award 4 points if gift's budget matches user's selection
- **FR-5.3** Occasion Match: Award 3 points if gift's occasions include user's selection
- **FR-5.4** Interest Match: Award 2 points per matching interest
- **FR-5.5** Only display gifts with score > 0
- **FR-5.6** Sort results by score in descending order

#### FR-6: Results Display
- **FR-6.1** Display search summary showing budget, occasion, and result count
- **FR-6.2** Show gifts in a grid layout (responsive)
- **FR-6.3** Display gift rank number (1-10)
- **FR-6.4** Show gift name, category, and matching interests
- **FR-6.5** Display visual match score with progress bar
- **FR-6.6** Show numerical score out of maximum possible (score/15)
- **FR-6.7** Provide "Find Another Gift" button to restart search
- **FR-6.8** Display "no results" screen when no gifts match

#### FR-7: Navigation Flow
- **FR-7.1** Welcome → Form → Results
- **FR-7.2** Restart button returns to Welcome screen
- **FR-7.3** Back button returns to previous question (disabled on first question)
- **FR-7.4** Maintain form state when navigating backward

#### FR-8: Gift Database
- **FR-8.1** Maintain database of at least 50 curated gifts
- **FR-8.2** Each gift must have: unique ID, name, category, interests array, age groups array, budget tier, occasions array
- **FR-8.3** Cover diverse categories: tech, books, fitness, home, fashion, art, gaming, experiences, outdoor, food, toys, jewelry, beauty, pets
- **FR-8.4** Ensure gifts span all budget ranges
- **FR-8.5** Ensure gifts cover all age groups
- **FR-8.6** Ensure gifts match various occasions and interests

### Non-Functional Requirements

#### NFR-1: Performance
- **NFR-1.1** App must load in under 3 seconds on 3G connection
- **NFR-1.2** Question transitions must be smooth (<100ms)
- **NFR-1.3** Recommendation calculation must complete in under 500ms
- **NFR-1.4** Build size must be optimized (target: <500KB gzipped)

#### NFR-2: Progressive Web App (PWA)
- **NFR-2.1** App must be installable on mobile devices
- **NFR-2.2** App must work offline after initial load
- **NFR-2.3** Service worker must cache all critical assets
- **NFR-2.4** Manifest file must include proper metadata and icons
- **NFR-2.5** Service worker must auto-update when new version is deployed

#### NFR-3: Responsive Design
- **NFR-3.1** Support mobile devices (320px minimum width)
- **NFR-3.2** Support tablets (768px breakpoint)
- **NFR-3.3** Support desktop (1200px+ optimal)
- **NFR-3.4** Touch-friendly buttons (minimum 44x44px tap targets)
- **NFR-3.5** Readable text on all screen sizes

#### NFR-4: Accessibility
- **NFR-4.1** All interactive elements must be keyboard accessible
- **NFR-4.2** Focus states must be clearly visible
- **NFR-4.3** Color contrast must meet WCAG AA standards
- **NFR-4.4** Semantic HTML must be used throughout
- **NFR-4.5** Font sizes must be readable (minimum 16px for body text)

#### NFR-5: Browser Support
- **NFR-5.1** Support latest 2 versions of Chrome, Firefox, Safari, Edge
- **NFR-5.2** Support iOS Safari 14+
- **NFR-5.3** Support Chrome on Android
- **NFR-5.4** Graceful degradation for older browsers

#### NFR-6: Security
- **NFR-6.1** All external resources must be served over HTTPS
- **NFR-6.2** No user data should be stored or transmitted
- **NFR-6.3** No external API calls (all processing client-side)
- **NFR-6.4** Content Security Policy headers should be implemented

#### NFR-7: Maintainability
- **NFR-7.1** Code must follow React best practices
- **NFR-7.2** Components must be modular and reusable
- **NFR-7.3** CSS must be scoped to components
- **NFR-7.4** Gift database must be easily extensible
- **NFR-7.5** Questions must be configurable via data files

#### NFR-8: Deployment
- **NFR-8.1** Support deployment to Vercel, Netlify, and GitHub Pages
- **NFR-8.2** Build process must be automated
- **NFR-8.3** Zero-configuration deployment for supported platforms
- **NFR-8.4** Provide CI/CD pipeline via GitHub Actions

## User Interface Specifications

### UI-1: Color Palette
- **Primary Gradient:** Linear gradient from #667eea to #764ba2 (purple)
- **Background:** White (#ffffff) for content cards
- **Text Primary:** #2d3748 (dark gray)
- **Text Secondary:** #718096 (medium gray)
- **Borders:** #e2e8f0 (light gray)
- **Selected State:** Purple gradient background with white text
- **Hover State:** Light purple tint (#f7fafc) with purple border

### UI-2: Typography
- **Font Family:** Inter, system fonts fallback
- **Welcome Title:** 56px, weight 900
- **Welcome Subtitle:** 24px, weight 600
- **Question Text:** 28px, weight 700
- **Body Text:** 18px, weight 400
- **Button Text:** 16-18px, weight 600-700
- **Small Text:** 14px, weight 500-600

### UI-3: Spacing
- **Container Padding:** 20-40px
- **Card Border Radius:** 12-24px
- **Button Padding:** 14-18px vertical, 32-48px horizontal
- **Grid Gap:** 12-24px
- **Section Margins:** 40-48px

### UI-4: Animations
- **Slide Up (Welcome):** 0.6s ease, translate from 30px below
- **Fade In (Questions):** 0.4s ease, opacity and translate
- **Button Hover:** Transform translateY(-2px to -3px)
- **Progress Bar:** Width transition 0.3s ease
- **Score Bar:** Width transition 0.5s ease

### UI-5: Layout
- **Welcome Screen:** Centered card, max-width 600px
- **Form Container:** Max-width 700px, white card on gradient background
- **Results Container:** Max-width 1200px
- **Gift Grid:** Auto-fill, minimum 320px columns
- **Mobile Grid:** Single column layout

## Data Model Specifications

### Gift Object Schema
```javascript
{
  id: Number (unique),
  name: String (required),
  category: String (required),
  interests: Array<String> (required, min 1),
  ageGroup: Array<String> (required, min 1, values: "child"|"teen"|"adult"|"senior"),
  budget: String (required, values: "low"|"medium"|"high"),
  occasions: Array<String> (required, min 1)
}
```

### Question Object Schema
```javascript
{
  id: String (unique, lowercase with hyphens),
  question: String (required),
  type: String (required, values: "single-choice"|"multiple-choice"),
  options: Array<{
    value: String (required),
    label: String (required)
  }> (required, min 2)
}
```

### User Answers Schema
```javascript
{
  relationship: String (optional),
  age: String (required, values: "child"|"teen"|"adult"|"senior"),
  gender: String (optional),
  occasion: String (required),
  interests: Array<String> (required, min 1),
  budget: String (required, values: "low"|"medium"|"high")
}
```

### Recommendation Result Schema
```javascript
{
  ...Gift,
  score: Number (calculated),
  matchingInterests: Array<String> (calculated)
}
```

## API Specifications

### Internal Function APIs

#### `getGiftRecommendations(answers: UserAnswers): RecommendationResult[]`
**Purpose:** Calculate and return top gift recommendations based on user answers

**Input:**
- `answers`: Object containing user's questionnaire responses

**Output:**
- Array of gift recommendations sorted by score (descending)
- Maximum 10 results
- Minimum score of 1

**Algorithm:**
1. Iterate through all gifts in database
2. Calculate score for each gift based on answers
3. Filter gifts with score > 0
4. Sort by score descending
5. Return top 10 gifts

#### `getBudgetLabel(budget: String): String`
**Purpose:** Convert budget code to human-readable label

**Input:**
- `budget`: "low" | "medium" | "high"

**Output:**
- "Under $30" | "$30 - $100" | "Over $100"

#### `getOccasionLabel(occasion: String): String`
**Purpose:** Convert occasion code to human-readable label

**Input:**
- `occasion`: Occasion code (e.g., "mother-day")

**Output:**
- Formatted label (e.g., "Mother's Day")

## Testing Specifications

### Test Coverage Requirements
- **Unit Tests:** Minimum 80% code coverage
- **Component Tests:** All components must have tests
- **Integration Tests:** Full user flow must be tested
- **E2E Tests:** Critical paths must be covered

### Test Scenarios

#### TS-1: Questionnaire Flow
- Navigate through all 6 questions
- Verify back button functionality
- Verify validation prevents skipping questions
- Verify progress indicator updates correctly

#### TS-2: Recommendation Engine
- Test with all age groups
- Test with all budget ranges
- Test with single interest
- Test with multiple interests
- Test with no matching gifts
- Verify scoring algorithm accuracy

#### TS-3: Responsive Design
- Test on mobile viewport (320px, 375px, 414px)
- Test on tablet viewport (768px, 1024px)
- Test on desktop viewport (1280px, 1920px)

#### TS-4: PWA Functionality
- Test installability
- Test offline functionality
- Test service worker caching
- Test auto-update mechanism

## Future Enhancements (Out of Scope for v1.0)

### Phase 2 Features
- User accounts and saved searches
- Gift price integration with affiliate links
- Share results via social media or email
- Filter and sort results
- Gift wishlist creation
- AI-powered descriptions and recommendations

### Phase 3 Features
- Multi-language support (i18n)
- Custom gift database per user
- Admin panel for managing gifts
- Analytics and usage tracking
- Gift reminders and calendar integration

## Success Metrics

### User Engagement
- Time to complete questionnaire: Target < 2 minutes
- Completion rate: Target > 80%
- Return visits: Target > 30% within 7 days

### Technical Performance
- Lighthouse PWA score: Target > 90
- Lighthouse Performance score: Target > 90
- Lighthouse Accessibility score: Target > 95
- Zero critical errors in production

### Business Metrics
- App installations: Track PWA installs
- User satisfaction: Target > 4.5/5 stars
- Share rate: Target > 10% of users share results

## Constraints and Assumptions

### Constraints
- No backend server or database
- All processing must be client-side
- No external API dependencies
- Must work offline after initial load
- Must be deployable as static site

### Assumptions
- Users have modern browsers (released within last 2 years)
- Users have JavaScript enabled
- Users have reasonable internet connection for initial load
- Gift database is curated and maintained manually
- No real-time pricing or availability data

## Glossary

- **PWA:** Progressive Web App - web application that can be installed and work offline
- **Service Worker:** Background script that enables offline functionality
- **Manifest:** JSON file defining PWA metadata and appearance
- **Score:** Numerical value representing how well a gift matches user preferences
- **Match:** When a gift's attributes align with user's answers
- **Category:** High-level classification of gift type
- **Interest:** User or gift-specific hobby or preference area
- **Budget Tier:** Price range classification (low/medium/high)

## Document Control

**Version:** 1.0.0
**Last Updated:** 2026-01-12
**Status:** Active
**Owner:** BePresent Development Team
**Review Cycle:** Quarterly or on major feature changes
