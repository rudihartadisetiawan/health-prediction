from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
from typing import Optional

app = FastAPI(title="HealthPredict ML API", version="1.0.0")

# CORS configuration - allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for models and scalers
diabetes_model = None
diabetes_scaler = None
heart_model = None
heart_scaler = None


class DiabetesInput(BaseModel):
    Pregnancies: int
    Glucose: float
    BloodPressure: float
    SkinThickness: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int


class HeartInput(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: float
    chol: float
    fbs: int
    restecg: int
    thalach: float
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int


class PredictionResponse(BaseModel):
    score: float
    riskLevel: str
    probability: float


class HealthResponse(BaseModel):
    status: str
    models_loaded: bool


def get_risk_level(score: float) -> str:
    """Determine risk level based on score."""
    if score < 30:
        return "low"
    elif score <= 60:
        return "medium"
    else:
        return "high"


def load_models():
    """Load all ML models and scalers at startup."""
    global diabetes_model, diabetes_scaler, heart_model, heart_scaler
    
    try:
        diabetes_model = joblib.load("models/diabetes_model.pkl")
        diabetes_scaler = joblib.load("models/diabetes_scaler.pkl")
        heart_model = joblib.load("models/heart_model.pkl")
        heart_scaler = joblib.load("models/heart_scaler.pkl")
        return True
    except Exception as e:
        print(f"Error loading models: {e}")
        return False


@app.on_event("startup")
async def startup_event():
    """Load models when server starts."""
    global models_loaded
    models_loaded = load_models()


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(
        status="ok",
        models_loaded=models_loaded
    )


@app.post("/predict/diabetes", response_model=PredictionResponse)
async def predict_diabetes(data: DiabetesInput):
    """Predict diabetes risk based on input features."""
    if diabetes_model is None or diabetes_scaler is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Diabetes model not loaded"
        )
    
    try:
        # Prepare input data
        input_data = pd.DataFrame([{
            "Pregnancies": data.Pregnancies,
            "Glucose": data.Glucose,
            "BloodPressure": data.BloodPressure,
            "SkinThickness": data.SkinThickness,
            "Insulin": data.Insulin,
            "BMI": data.BMI,
            "DiabetesPedigreeFunction": data.DiabetesPedigreeFunction,
            "Age": data.Age
        }])
        
        # Transform with scaler
        scaled_data = diabetes_scaler.transform(input_data)
        
        # Get prediction probability
        probability = diabetes_model.predict_proba(scaled_data)[0][1]
        
        # Calculate score (probability * 100)
        score = probability * 100
        
        # Determine risk level
        risk_level = get_risk_level(score)
        
        return PredictionResponse(
            score=score,
            riskLevel=risk_level,
            probability=probability
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Prediction error: {str(e)}"
        )


@app.post("/predict/heart", response_model=PredictionResponse)
async def predict_heart(data: HeartInput):
    """Predict heart disease risk based on input features."""
    if heart_model is None or heart_scaler is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Heart model not loaded"
        )
    
    try:
        # Prepare input data
        input_data = pd.DataFrame([{
            "age": data.age,
            "sex": data.sex,
            "cp": data.cp,
            "trestbps": data.trestbps,
            "chol": data.chol,
            "fbs": data.fbs,
            "restecg": data.restecg,
            "thalach": data.thalach,
            "exang": data.exang,
            "oldpeak": data.oldpeak,
            "slope": data.slope,
            "ca": data.ca,
            "thal": data.thal
        }])
        
        # Transform with scaler
        scaled_data = heart_scaler.transform(input_data)
        
        # Get prediction probability
        probability = heart_model.predict_proba(scaled_data)[0][1]
        
        # Calculate score (probability * 100)
        score = probability * 100
        
        # Determine risk level
        risk_level = get_risk_level(score)
        
        return PredictionResponse(
            score=score,
            riskLevel=risk_level,
            probability=probability
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Prediction error: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
