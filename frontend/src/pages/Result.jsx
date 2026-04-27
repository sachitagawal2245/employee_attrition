import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../App.css";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!data) {
    return (
      <div className="result-container">
        <div className="result-card error-card">
          <div className="result-icon">⚠️</div>
          <h2>No Prediction Data Found</h2>
          <p>Please complete the prediction form first.</p>
          <button
            className="result-btn primary-btn"
            onClick={() => navigate("/predict")}
          >
            Go to Prediction
          </button>
        </div>
      </div>
    );
  }
  const prediction = data.attrition_prediction;
  const probability = data.probability * 100; 
  const riskLevel = data.risk_level;

  const getRiskClass = () => {
    if (riskLevel === "High Risk") return "high";
    if (riskLevel === "Medium Risk") return "medium";
    return "low";
  };

  const getRecommendation = () => {
    if (riskLevel === "High Risk") {
      return "Immediate retention intervention recommended. Review compensation, workload, and employee engagement strategies.";
    }
    if (riskLevel === "Medium Risk") {
      return "Monitor employee closely and consider engagement improvements.";
    }
    return "Employee appears stable. Continue current engagement strategies.";
  };

  return (
    <div className="result-container">
      <div className="result-card">
        <div className="result-header">
          <div className={`result-status-badge ${getRiskClass()}`}>
            {riskLevel}
          </div>
          <h2>Attrition Prediction Result</h2>
        </div>

        <div className="result-content">

          {/* Risk Display */}
          <div className={`result-status ${getRiskClass()}`}>
            {riskLevel}
          </div>

          {/* Probability */}
          <div className="result-confidence">
            <div className="confidence-label">
              <span>Confidence Score</span>
              <span className="confidence-value">
                {probability.toFixed(1)}%
              </span>
            </div>

            <div className="confidence-bar">
              <div
                className={`confidence-fill ${getRiskClass()}`}
                style={{ width: `${Math.max(0, Math.min(probability, 100))}%` }}
              ></div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="result-recommendation">
            <h3>Recommendation</h3>
            <p>{getRecommendation()}</p>
          </div>

          {/* Action Buttons */}
          <div className="result-actions">
            <button
              className="result-btn primary-btn"
              onClick={() => navigate("/predict")}
            >
              New Prediction
            </button>

            <button
              className="result-btn secondary-btn"
              onClick={() => navigate("/")}
            >
              Home
            </button>
          </div>

          <p className="result-disclaimer">
            This prediction is based on a machine learning model and should be
            used as a decision-support tool, not as the sole basis for HR decisions.
          </p>

        </div>
      </div>
    </div>
  );
}

export default Result;