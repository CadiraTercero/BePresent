import { useState } from 'react';
import { questions } from '../data/questions';
import './GiftFinderForm.css';

const GiftFinderForm = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (questionId, value) => {
    if (currentQuestion.type === 'multiple-choice') {
      const currentAnswers = answers[questionId] || [];
      const newAnswers = currentAnswers.includes(value)
        ? currentAnswers.filter(v => v !== value)
        : [...currentAnswers, value];
      setAnswers({ ...answers, [questionId]: newAnswers });
    } else {
      setAnswers({ ...answers, [questionId]: value });
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isAnswered = () => {
    const answer = answers[currentQuestion.id];
    if (currentQuestion.type === 'multiple-choice') {
      return answer && answer.length > 0;
    }
    return answer !== undefined;
  };

  return (
    <div className="form-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="question-container">
        <div className="question-number">
          Question {currentStep + 1} of {questions.length}
        </div>

        <h2 className="question-text">{currentQuestion.question}</h2>

        <div className="options-container">
          {currentQuestion.options.map((option) => {
            const isSelected = currentQuestion.type === 'multiple-choice'
              ? (answers[currentQuestion.id] || []).includes(option.value)
              : answers[currentQuestion.id] === option.value;

            return (
              <button
                key={option.value}
                className={`option-button ${isSelected ? 'selected' : ''}`}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="navigation-buttons">
          <button
            className="nav-button back-button"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </button>

          <button
            className="nav-button next-button"
            onClick={handleNext}
            disabled={!isAnswered()}
          >
            {currentStep === questions.length - 1 ? 'Find Gifts' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiftFinderForm;
