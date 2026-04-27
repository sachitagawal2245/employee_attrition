import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Predict() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    JobSatisfaction: "",
    JobInvolvement: "",
    RelationshipSatisfaction: "",
    EnvironmentSatisfaction: "",
    StockOptionLevel: "",
    MonthlyIncome: "",
    DailyRate: "",
    MonthlyRate: "",
    JobLevel: "",
    YearsWithCurrManager: "",
    TotalWorkingYears: "",
    DistanceFromHome: "",
    Age: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value)
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formattedData = {};

  for (const key in formData) {
    if (formData[key] === "" || formData[key] === undefined) {
      alert("Please fill all fields");
      return;
    }
    formattedData[key] = Number(formData[key]);
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    });

    const data = await response.json();
    console.log("Raw API response:", data);
    if (!response.ok) {
      console.log(data);
      throw new Error("Server error");
    }

    navigate("/result", { state: data });

  } catch (error) {
    console.error(error);
    alert("Failed to connect to API");
  }
};

  const formatFieldName = (field) =>
    field.replace(/([A-Z])/g, " $1").trim();

  const getPlaceholder = () => "Enter value";

  return (
    <div className="predict-page">
      <div className="predict-wrapper">
        <h1 className="predict-title">Employee Attrition Prediction</h1>

        <form onSubmit={handleSubmit} className="predict-card">

          {/* Satisfaction Section */}
          <div className="form-section">
            <h3>Satisfaction Metrics</h3>
            <div className="form-grid">
              {["JobSatisfaction", "JobInvolvement", "RelationshipSatisfaction", "EnvironmentSatisfaction"].map((key) => (
                <div className="form-group" key={key}>
                  <label>{formatFieldName(key)}</label>
                  <input
                    type="number"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    placeholder={getPlaceholder(key)}
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Compensation Section */}
          <div className="form-section">
            <h3>Compensation</h3>
            <div className="form-grid">
              {["StockOptionLevel", "MonthlyIncome", "DailyRate", "MonthlyRate"].map((key) => (
                <div className="form-group" key={key}>
                  <label>{formatFieldName(key)}</label>
                  <input
                    type="number"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    placeholder={getPlaceholder(key)}
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="form-section">
            <h3>Experience & Career</h3>
            <div className="form-grid">
              {["JobLevel", "YearsWithCurrManager", "TotalWorkingYears", "DistanceFromHome", "Age"].map((key) => (
                <div className="form-group" key={key}>
                  <label>{formatFieldName(key)}</label>
                  <input
                    type="number"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    placeholder={getPlaceholder(key)}
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="predict-btn">
            Predict Attrition Risk
          </button>

        </form>
      </div>
    </div>
  );
}

export default Predict;