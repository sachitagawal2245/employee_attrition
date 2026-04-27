#  Employee Attrition Predictor

> A full-stack ML-powered web application that predicts the likelihood of an employee leaving the company — helping HR teams make proactive, data-driven retention decisions.

---

##  Overview

Employee attrition is one of the costliest challenges organizations face. This project uses a **Machine Learning model** trained on HR data to predict whether an employee is likely to leave the company, based on key personal and professional factors.

The system is built with a modern, decoupled architecture:
-  **ML Model** — Random Forest Classifier (scikit-learn)
-  **Backend API** — FastAPI
-  **Frontend** — React

---

##  Problem Statement
Given a set of employee attributes, predict:
> **Will this employee leave the company? (Yes / No)**

This enables HR departments to identify at-risk employees early and take preventive action.

---

##  Dataset

- **Original Features:** 35
- **Features After Engineering:** 13
- **Target Variable:** `Attrition` (Yes / No)

###  Key Features Used for Prediction

| Feature | Description |
|---|---|
| `DistanceFromHome` | Distance between home and workplace |
| `EnvironmentSatisfaction` | Employee's satisfaction with work environment |
| `JobSatisfaction` | Satisfaction level with the job role |
| `WorkLifeBalance` | Perceived work-life balance |
| `MonthlyIncome` | Monthly salary of the employee |
| `OverTime` | Whether the employee works overtime |
| `YearsAtCompany` | Total years spent at the company |
| `Age` | Age of the employee |
| `JobRole` | Current job role/designation |
| `TotalWorkingYears` | Total years of professional experience |
| `TrainingTimesLastYear` | Number of trainings attended last year |
| `JobInvolvement` | Level of involvement in job responsibilities |

---

##  Feature Engineering

Starting with 35 raw features, the following steps were applied to arrive at the final 13 features:

- Dropped low-variance and redundant columns (e.g., `EmployeeCount`, `Over18`, `StandardHours`)
- Handled missing values and outliers
- Encoded categorical variables (Label Encoding / One-Hot Encoding)
- Selected top features using feature importance from the Random Forest model
- Scaled numerical features where required

---

##  Machine Learning

### Model: Random Forest Classifier

Random Forest was chosen as the final model after evaluating multiple classifiers, due to its:
- High accuracy on imbalanced HR datasets
- Built-in feature importance ranking
- Robustness to overfitting

### Training Pipeline

```
Raw Dataset (35 features)
        ↓
Exploratory Data Analysis (EDA)
        ↓
Feature Engineering & Selection
        ↓
Train/Test Split
        ↓
Model Training (Random Forest Classifier)
        ↓
Evaluation (Accuracy, Precision, Recall, F1, ROC-AUC)
        ↓
Model Serialization (joblib / pickle)
```

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Machine Learning | Python, scikit-learn, pandas, numpy |
| Backend API | FastAPI |
| Frontend | React |
| Model Serialization | joblib |
| API Communication | REST (JSON) |

---


##  Getting Started

### Prerequisites

- Python 3.8+
- npm or yarn

---

### Backend Setup (FastAPI)

uvicorn main:app --reload
```

API will be available at: `http://localhost:8000`

API Docs (Swagger UI): `http://localhost:8000/docs`

---

###  Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

App will be available at: `http://localhost:3000`

---


## 🔌 API Reference

### `POST /predict`

Predicts whether an employee will leave the company.

**Request Body:**
```json
{
  "age": 34,
  "distance_from_home": 10,
  "environment_satisfaction": 3,
  "job_satisfaction": 2,
  "work_life_balance": 1,
  "monthly_income": 4500,
  "over_time": "Yes",
  "years_at_company": 5,
  "job_role": "Sales Executive",
  "num_companies_worked": 3,
  "total_working_years": 10,
  "training_times_last_year": 2,
  "job_involvement": 2
}
```

**Response:**
```json
{
  "attrition": "Yes",
  "probability": 0.78,
  "risk_level": "High"
}
---

##  Frontend Features

- Input form to enter employee details
- Real-time attrition prediction with probability score
- Risk level indicator (Low / Medium / High)
- Clean, responsive UI

---

## Future Improvements

-  Add SHAP values for model explainability
-  Dashboard with attrition trends and analytics
-  Support for batch prediction via CSV upload
-  User authentication for HR portal access
-  Deploy to cloud (AWS / GCP / Render)

---

##  Author
**Sachit Agarwal*
- GitHub:(https://github.com/sachitagawal2245)
- LinkedIn: www.linkedin.com/in/sachit-agarwal-8282461b7

---

##  License

This project is licensed under the MIT License.
