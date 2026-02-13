from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import joblib
import pandas as pd
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)
MODEL_PATH = "model.pkl"
try:
    model = joblib.load(MODEL_PATH)
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    model = None
app = FastAPI(
    title="Employee Attrition Prediction API",
    description="Predict employee attrition probability using AdaBoost",
    version="1.0"
)
class EmployeeInput(BaseModel):
    StockOptionLevel: int = Field(ge=0, le=3, description="Stock option level (0-3)")
    JobSatisfaction: int = Field(ge=1, le=4, description="Job satisfaction rating (1-4)")
    PercentSalaryHike: int = Field(ge=0, le=25, description="Percentage salary hike (0-25)")
    JobLevel: int = Field(ge=1, le=5, description="Job level (1-5)")
    JobInvolvement: int = Field(ge=1, le=4, description="Job involvement rating (1-4)")
    RelationshipSatisfaction: int = Field(ge=1, le=4, description="Relationship satisfaction rating (1-4)")
    WorkLifeBalance: int = Field(ge=1, le=4, description="Work-life balance rating (1-4)")
    MonthlyIncome: float = Field(ge=0, le=100000, description="Monthly income")
    EnvironmentSatisfaction: int = Field(ge=1, le=4, description="Environment satisfaction rating (1-4)")
    YearsWithCurrManager: int = Field(ge=0, le=50, description="Years with current manager")
    YearsAtCompany: int = Field(ge=0, le=50, description="Years at company")
    TotalWorkingYears: int = Field(ge=0, le=50, description="Total working years")
    class Config:
        schema_extra = {
            "example": {
                "StockOptionLevel": 2,
                "JobSatisfaction": 3,
                "PercentSalaryHike": 15,
                "JobLevel": 3,
                "JobInvolvement": 4,
                "RelationshipSatisfaction": 3,
                "WorkLifeBalance": 3,
                "MonthlyIncome": 6500,
                "EnvironmentSatisfaction": 4,
                "YearsWithCurrManager": 4,
                "YearsAtCompany": 7,
                "TotalWorkingYears": 12
            }
        }

class APIStatus(BaseModel):
    status: str
    version: str
    model_loaded: bool
    desc: str
@app.get("/", response_model=APIStatus)
def home():
    return APIStatus(
        status="active",
        version="1.0",
        model_loaded=model is not None,
        desc="Employee Attrition Prediction API using AdaBoost"
    )
def risk_label(probability: float) -> str:
    if probability >= 0.7:
        return "High Risk"
    elif probability >= 0.4:
        return "Medium Risk"
    else:
        return "Low Risk"
@app.get("/health")
def health():
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    return {
        "status": "Model loaded and API running",
        "model_loaded": True
    }
@app.post("/predict")
def predict_attrition(data: EmployeeInput):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    input_df = pd.DataFrame([data.model_dump()])
    if hasattr(model, "feature_names_in_"):
        input_df = input_df[model.feature_names_in_]

    prediction = model.predict(input_df)[0]

    return {
        "attrition_prediction": int(prediction),
        "risk_level": "High Risk" if prediction == 1 else "Low Risk"
    }



