# BePresent - Gift Finder PWA

A Progressive Web App that helps you find the perfect gift for your loved ones through a guided questionnaire.

## Features

- **Dynamic Multi-Step Form**: Answer questions about the recipient (relationship, age, interests, budget, occasion)
- **Smart Recommendations**: Get personalized gift suggestions based on a scoring algorithm
- **Progressive Web App**: Install on any device and works offline
- **Responsive Design**: Beautiful UI that works on mobile, tablet, and desktop
- **50+ Gift Ideas**: Curated database covering various categories and budgets

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd gift-finder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## How It Works

1. **Welcome Screen**: Users are greeted with an introduction to the app
2. **Questionnaire**: Users answer 6 questions about the gift recipient:
   - Relationship to the person
   - Age group
   - Gender
   - Occasion
   - Interests (multiple selection)
   - Budget range
3. **Results**: The app displays up to 10 personalized gift recommendations with match scores
4. **Restart**: Users can start a new search for a different person

## Recommendation Algorithm

Gifts are scored based on multiple factors:
- **Age Match** (weight: 3 points)
- **Budget Match** (weight: 4 points)
- **Occasion Match** (weight: 3 points)
- **Interest Matches** (weight: 2 points per matching interest)

Gifts are then sorted by score and the top 10 are displayed.

## Project Structure

```
gift-finder/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── GiftFinderForm.jsx
│   │   ├── GiftFinderForm.css
│   │   ├── ResultsPage.jsx
│   │   └── ResultsPage.css
│   ├── data/           # Data files
│   │   ├── giftDatabase.js
│   │   └── questions.js
│   ├── utils/          # Utility functions
│   │   └── recommendationEngine.js
│   ├── App.jsx         # Main app component
│   ├── App.css
│   ├── index.css       # Global styles
│   └── main.jsx        # Entry point
├── index.html
├── vite.config.js      # Vite & PWA configuration
└── package.json
```

## Technologies Used

- **React** - UI framework
- **Vite** - Build tool and dev server
- **vite-plugin-pwa** - PWA capabilities with Workbox
- **CSS3** - Styling with gradients, animations, and responsive design

## Customization

### Adding More Gifts

Edit `src/data/giftDatabase.js` and add new gift objects following this structure:

```javascript
{
  id: 51,
  name: "Gift Name",
  category: "category-name",
  interests: ["interest1", "interest2"],
  ageGroup: ["adult"],
  budget: "medium",
  occasions: ["birthday", "christmas"]
}
```

### Modifying Questions

Edit `src/data/questions.js` to add, remove, or modify questions.

### Changing Theme Colors

The app uses a purple gradient theme. To change colors, update the gradient values in:
- `src/App.css`
- `src/components/GiftFinderForm.css`
- `src/components/ResultsPage.css`
- `vite.config.js` (manifest theme_color)

## PWA Features

- Service worker for offline functionality
- Manifest file for installation on devices
- Automatic updates when new versions are deployed
- Works as a standalone app when installed

## License

This project is open source and available for personal and commercial use.
