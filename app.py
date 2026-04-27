from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import joblib
import pandas as pd
import numpy as np
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)
MODEL_PATH = "best_model.pkl"
try:
    model = joblib.load(MODEL_PATH)
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    model = None


from fastapi.middleware.cors import CORSMiddleware

 
app = FastAPI(
    title="Employee Attrition Prediction API",
    description="Predict employee attrition probability using AdaBoost",
    version="1.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)  
class EmployeeInput(BaseModel):
    StockOptionLevel: int = Field(ge=0, le=3, description="Stock option level (0-3)")
    JobSatisfaction: int = Field(ge=1, le=4, description="Job satisfaction rating (1-4)")
    JobLevel: int = Field(ge=1, le=5, description="Job level (1-5)")
    JobInvolvement: int = Field(ge=1, le=4, description="Job involvement rating (1-4)")
    RelationshipSatisfaction: int = Field(ge=1, le=4, description="Relationship satisfaction rating (1-4)")
    DistanceFromHome: int = Field(ge=1, le=30, description="Distance from home")
    MonthlyIncome: float = Field(ge=0, le=100000, description="Monthly income")
    EnvironmentSatisfaction: int = Field(ge=1, le=4, description="Environment satisfaction rating (1-4)")
    YearsWithCurrManager: int = Field(ge=0, le=50, description="Years with current manager")
    TotalWorkingYears: int = Field(ge=0, le=50, description="Total working years")
    DailyRate: int = Field(ge=0, le=2000, description="Daily rate")
    MonthlyRate: int = Field(ge=0, le=30000, description="Monthly rate")
    Age: int = Field(ge=18, le=60, description="Employee age")

    class Config:
        schema_extra = {
    "example": {
        "MonthlyIncome": 6500,
        "StockOptionLevel": 2,
        "JobInvolvement": 4,
        "TotalWorkingYears": 12,
        "JobLevel": 3,
        "JobSatisfaction": 3,
        "RelationshipSatisfaction": 3,
        "DailyRate": 800,
        "MonthlyRate": 15000,
        "Age": 32,
        "DistanceFromHome": 10,
        "EnvironmentSatisfaction": 4,
        "YearsWithCurrManager": 4
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
        desc="Employee Attrition Prediction API using RandomForest"
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
@app.post("/predict")
def predict_attrition(data: EmployeeInput):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    input_df = pd.DataFrame([data.model_dump()])
    input_df["MonthlyIncome"] = np.log(input_df["MonthlyIncome"] + 1e-9)
    input_df = input_df[model.feature_names_in_]
    print("Incoming data:")
    print(input_df)
    prob = model.predict_proba(input_df)[0][1]
    prediction = model.predict(input_df)[0]

    return {
        "attrition_prediction": int(prediction),
        "probability": round(float(prob), 3),
        "risk_level": risk_label(prob)
    }






