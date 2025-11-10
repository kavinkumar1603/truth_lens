import os
import json
import uuid
from datetime import datetime
from typing import List, Dict, Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
VECTORIZER_PATH = os.path.join(BASE_DIR, "tfidf_vectorizer.pkl")
MODEL_PATH = os.path.join(BASE_DIR, "logistic_model.pkl")
HISTORY_PATH = os.path.join(BASE_DIR, "history.json")

app = FastAPI(title="News Credibility API", version="1.0")

# CORS for local React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load artifacts lazily so server can start even if files are missing
_vectorizer = None
_model = None


def load_artifacts():
    global _vectorizer, _model
    if _vectorizer is None:
        if not os.path.exists(VECTORIZER_PATH):
            raise FileNotFoundError(
                f"Vectorizer not found at {VECTORIZER_PATH}. Train the model in the notebook first.")
        _vectorizer = joblib.load(VECTORIZER_PATH)
    if _model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(
                f"Model not found at {MODEL_PATH}. Train the model in the notebook first.")
        _model = joblib.load(MODEL_PATH)


class AnalyzeRequest(BaseModel):
    # For compatibility with frontend, we still accept a 'type' field but only 'text' is supported.
    type: str = "text"
    content: str


class AnalyzeResponse(BaseModel):
    id: str
    prediction: str  # 'real' | 'fake'
    confidence: float  # 0..1
    probability_real: float
    probability_fake: float
    content: str
    timestamp: str


# Utilities for history persistence

def read_history() -> List[Dict[str, Any]]:
    if not os.path.exists(HISTORY_PATH):
        return []
    try:
        with open(HISTORY_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []


def write_history(items: List[Dict[str, Any]]):
    with open(HISTORY_PATH, "w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, indent=2)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/analyze", response_model=AnalyzeResponse)
def analyze(req: AnalyzeRequest):
    if not req.content or not req.content.strip():
        raise HTTPException(status_code=400, detail="content must not be empty")

    load_artifacts()

    # Text-only: ignore req.type and treat content as plain text
    text = req.content

    # Vectorize and predict
    X = _vectorizer.transform([str(text)])
    proba = _model.predict_proba(X)[0]
    # Assuming classes_ are [0, 1] corresponding to fake (0) and real (1)
    prob_fake = float(proba[_model.classes_.tolist().index(0)]) if hasattr(_model, "classes_") else float(proba[0])
    prob_real = float(proba[_model.classes_.tolist().index(1)]) if hasattr(_model, "classes_") else float(proba[-1])

    prediction_label = "real" if prob_real >= prob_fake else "fake"
    confidence = max(prob_real, prob_fake)

    item = {
        "id": str(uuid.uuid4()),
        "prediction": prediction_label,
        "confidence": confidence,
        "probability_real": prob_real,
        "probability_fake": prob_fake,
        "content": text,
        "timestamp": datetime.utcnow().isoformat() + "Z",
    }

    history = read_history()
    history.insert(0, item)
    # Keep only last 100 records
    history = history[:100]
    write_history(history)

    return item


@app.get("/api/history")
def get_history():
    return read_history()


@app.delete("/api/history")
def clear_history():
    write_history([])
    return {"status": "cleared"}


@app.delete("/api/analysis/{item_id}")
def delete_analysis(item_id: str):
    history = read_history()
    new_history = [h for h in history if h.get("id") != item_id]
    write_history(new_history)
    return {"status": "deleted", "deleted": len(history) - len(new_history)}


@app.get("/api/statistics")
def statistics():
    history = read_history()
    total = len(history)
    real_count = sum(1 for h in history if h.get("prediction") == "real")
    fake_count = sum(1 for h in history if h.get("prediction") == "fake")
    avg_conf = sum(h.get("confidence", 0.0) for h in history) / total if total else 0.0
    return {
        "total": total,
        "real": real_count,
        "fake": fake_count,
        "avg_confidence": avg_conf,
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)  # Matches frontend default
