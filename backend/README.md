# Backend API for News Credibility

This FastAPI server serves the trained TF-IDF + Logistic Regression model exported by the notebook (`app.ipynb`). It supports TEXT input only.

## Prerequisites
- Python 3.10+ (3.11 recommended)
- The following files in this folder (produced by the notebook):
  - `tfidf_vectorizer.pkl`
  - `logistic_model.pkl`

## Install and run (Windows, cmd)

```bat
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn server:app --reload --port 5000
```

The API will be available at `http://localhost:5000` and the frontend expects it at `http://localhost:5000/api`.

## Endpoints
- `GET /api/health` – health check
  - `POST /api/analyze` – body: `{ "type": "text", "content": "..." }`
  - response: `{ prediction: "real"|"fake", confidence: 0..1, probability_real, probability_fake, id, timestamp }`
- `GET /api/history` – returns last analyses
- `DELETE /api/history` – clear all history
- `DELETE /api/analysis/{id}` – delete one analysis by id
- `GET /api/statistics` – returns `{ total, real, fake, avg_confidence }`

## Notes
- Text-only API. The `type` field is accepted for compatibility but only `text` is supported.
- CORS is open for development. Restrict `allow_origins` before deploying.
