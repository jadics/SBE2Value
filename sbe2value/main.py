"""
SBE Processing Method Prediction API
Loads the trained Random Forest model and provides predictions via FastAPI
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
from typing import List

# Initialize FastAPI app
app = FastAPI(title="SBE Processing Method Predictor")

# Add CORS middleware to allow requests from the Next.js app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model pipeline
try:
    model_pipeline = joblib.load('rf_sbe_pipeline.joblib')
    print("✅ Model loaded successfully!")
except FileNotFoundError:
    print("❌ Error: rf_sbe_pipeline.joblib not found. Please ensure the model file is in the same directory.")
    model_pipeline = None

# Define input schema
class SBEInput(BaseModel):
    oil_type: str
    oil_content_pct: float
    surface_area: float
    ph: float
    desired_application: str

# Define output schema
class PredictionResult(BaseModel):
    predicted_method: str
    predicted_prob: float
    top3_classes: List[str]
    top3_probs: List[float]

@app.get("/")
def read_root():
    return {
        "message": "SBE Processing Method Prediction API",
        "status": "running",
        "model_loaded": model_pipeline is not None
    }

@app.post("/predict", response_model=PredictionResult)
def predict_processing_method(input_data: SBEInput):
    """
    Predict the best SBE processing method based on input parameters
    """
    if model_pipeline is None:
        raise HTTPException(status_code=500, detail="Model not loaded. Please check server logs.")
    
    try:
        # Create DataFrame with input data
        input_df = pd.DataFrame([{
            'Oil Type': input_data.oil_type,
            'Residual Oil Content (wt%)': input_data.oil_content_pct,
            'Surface Area (m²/g)': input_data.surface_area,
            'pH': input_data.ph,
            'Desired Application': input_data.desired_application
        }])
        
        # Get prediction
        predicted_class = model_pipeline.predict(input_df)[0]
        
        # Get prediction probabilities
        predicted_proba = model_pipeline.predict_proba(input_df)[0]
        
        # Get top 3 classes and their probabilities
        top3_indices = np.argsort(predicted_proba)[-3:][::-1]
        classes = model_pipeline.classes_
        
        top3_classes = [classes[i] for i in top3_indices]
        top3_probs = [float(predicted_proba[i]) for i in top3_indices]
        
        # Get the probability of the predicted class
        predicted_prob = float(max(predicted_proba))
        
        return PredictionResult(
            predicted_method=predicted_class,
            predicted_prob=predicted_prob,
            top3_classes=top3_classes,
            top3_probs=top3_probs
        )
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction error: {str(e)}")

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "model_loaded": model_pipeline is not None
    }

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting SBE Prediction API...")
    print("📍 API will be available at: http://127.0.0.1:8000")
    print("📖 API docs available at: http://127.0.0.1:8000/docs")
    print("\n⚠️  Make sure rf_sbe_pipeline.joblib is in the same directory!")
    uvicorn.run(app, host="127.0.0.1", port=8000)
