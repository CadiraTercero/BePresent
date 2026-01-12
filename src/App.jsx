import { useState } from 'react'
import GiftFinderForm from './components/GiftFinderForm'
import ResultsPage from './components/ResultsPage'
import { getGiftRecommendations } from './utils/recommendationEngine'
import './App.css'

function App() {
  const [stage, setStage] = useState('welcome'); // 'welcome', 'form', 'results'
  const [answers, setAnswers] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  console.log('App rendering, stage:', stage);

  const handleStart = () => {
    setStage('form');
  };

  const handleFormComplete = (formAnswers) => {
    setAnswers(formAnswers);
    const results = getGiftRecommendations(formAnswers);
    setRecommendations(results);
    setStage('results');
  };

  const handleRestart = () => {
    setStage('welcome');
    setAnswers(null);
    setRecommendations([]);
  };

  return (
    <div className="app">
      {stage === 'welcome' && (
        <div className="welcome-screen">
          <div className="welcome-content">
            <h1 className="app-title">BePresent</h1>
            <p className="app-subtitle">Find the perfect gift for your loved ones</p>
            <p className="app-description">
              Answer a few simple questions and we'll help you discover thoughtful gift ideas
              tailored to the special person in your life.
            </p>
            <button className="start-button" onClick={handleStart}>
              Get Started
            </button>
          </div>
        </div>
      )}

      {stage === 'form' && (
        <GiftFinderForm onComplete={handleFormComplete} />
      )}

      {stage === 'results' && (
        <ResultsPage
          recommendations={recommendations}
          answers={answers}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}

export default App
