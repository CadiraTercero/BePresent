import { getBudgetLabel, getOccasionLabel } from '../utils/recommendationEngine';
import './ResultsPage.css';

const ResultsPage = ({ recommendations, answers, onRestart }) => {
  return (
    <div className="results-container">
      <div className="results-header">
        <h1 className="results-title">Perfect Gift Ideas</h1>
        <p className="results-subtitle">
          Based on your preferences, here are our top recommendations
        </p>

        <div className="search-summary">
          <span className="summary-item">
            <strong>Budget:</strong> {getBudgetLabel(answers.budget)}
          </span>
          <span className="summary-item">
            <strong>Occasion:</strong> {getOccasionLabel(answers.occasion)}
          </span>
          <span className="summary-item">
            <strong>Results:</strong> {recommendations.length} gifts found
          </span>
        </div>
      </div>

      {recommendations.length === 0 ? (
        <div className="no-results">
          <h3>No gifts found matching your criteria</h3>
          <p>Try adjusting your preferences or starting a new search.</p>
          <button className="restart-button" onClick={onRestart}>
            Start New Search
          </button>
        </div>
      ) : (
        <>
          <div className="gifts-grid">
            {recommendations.map((gift, index) => (
              <div key={gift.id} className="gift-card">
                <div className="gift-rank">#{index + 1}</div>
                <div className="gift-content">
                  <h3 className="gift-name">{gift.name}</h3>
                  <div className="gift-category">{gift.category}</div>

                  {gift.matchingInterests && gift.matchingInterests.length > 0 && (
                    <div className="matching-interests">
                      <strong>Matches:</strong>{' '}
                      {gift.matchingInterests.map(interest => (
                        <span key={interest} className="interest-tag">
                          {interest}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="gift-score">
                    <div className="score-bar">
                      <div
                        className="score-fill"
                        style={{ width: `${(gift.score / 15) * 100}%` }}
                      ></div>
                    </div>
                    <span className="score-label">
                      Match Score: {gift.score}/15
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="results-footer">
            <button className="restart-button" onClick={onRestart}>
              Find Another Gift
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultsPage;
