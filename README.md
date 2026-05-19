# Sthapatya-Kavach

An interpretable environmental vulnerability assessment framework for heritage conservation using deterministic climate-driven analysis.

---

## Overview

Sthapatya-Kavach is a full-stack scientific research prototype designed to evaluate the environmental vulnerability of heritage monuments using real climate telemetry and interpretable deterministic computation.

The framework integrates:

* NASA POWER climate data
* Environmental deterioration indices
* Material and structural modifiers
* Pollution and soil sensitivity
* Interactive scientific visualizations

Unlike black-box AI systems, the platform emphasizes:

* interpretability
* explainability
* deterministic environmental reasoning
* transparent vulnerability computation

---

## Key Features

### Climate-Driven Environmental Analysis

The framework computes monument vulnerability using:

* Thermal Fatigue Index (TFI)
* Moisture Vulnerability Index (MVI)
* Rain Impact Index (RII)
* Saturation Index (SAT)
* Seasonal Shock Index (SSI)

using real NASA POWER climate telemetry.

---

### Deterministic Risk Computation

Risk is computed using:

```python
risk = base * (
    1 +
    material_effect +
    structure_effect +
    soil_effect +
    pollution_effect
)
```

This avoids unstable multiplicative stacking and preserves interpretability.

---

### Interactive Scientific Dashboard

Frontend includes:

* live monument analysis
* radar chart visualization
* validation dashboard
* methodology explanation system
* limitations disclosure
* dynamic frontend-backend integration

---

### Real Climate Integration

The backend dynamically fetches:

* T2M_MAX
* T2M_MIN
* RH2M
* PRECTOTCORR

from NASA POWER API.

---

## Scientific Positioning

Sthapatya-Kavach is:

* an environmental vulnerability assessment framework
* an interpretable research prototype
* a heritage conservation prioritization tool

It is NOT:

* structural collapse prediction
* structural health monitoring
* finite element simulation
* engineering replacement software
* black-box AI prediction

---

## Technology Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Recharts
* Axios

### Backend

* FastAPI
* Uvicorn
* NumPy
* Pandas
* Requests

### Data Source

* NASA POWER API

---

## Project Architecture

```text
Sthapatya-Kavach/
├── frontend/
│   ├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   └── data/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── data/
│   │   └── main.py
│   └── venv/
│
└── README.md
```

---

## Current Monument Dataset

The prototype currently includes:

* Taj Mahal
* Qutub Minar
* Konark Sun Temple
* Gateway of India
* Hampi

---

## Validation Philosophy

The framework intentionally prioritizes:

* explainable outputs
* physically meaningful environmental reasoning
* transparent limitations

Known mismatches are preserved and explained scientifically rather than hidden.

For example:

* Konark Sun Temple underprediction reflects missing marine salt crystallization physics.

---

## Running The Project Locally

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Sthapatya-Kavach.git
cd Sthapatya-Kavach
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Backend Setup

```bash
cd backend
python -m venv venv
```

Activate virtual environment:

### Windows

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend:

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

---

## Example API Endpoint

```text
GET /analyze/taj-mahal
```

Returns:

```json
{
  "monument": "Taj Mahal",
  "climateScore": 39.38,
  "finalRisk": 64.98,
  "riskLevel": "MODERATE"
}
```

---

## Methodology Summary

Pipeline:

```text
NASA Climate Data
↓
Environmental Stress Indices
↓
Material / Structure / Soil / Pollution Modifiers
↓
Deterministic Risk Equation
↓
Environmental Vulnerability Score
↓
Validation Against Observed Deterioration
```

---

## Future Improvements

Planned future directions:

* dynamic monument search
* pollution API integration
* geospatial mapping
* report export system
* broader monument dataset
* conservation timeline simulation
* deployment pipeline

---

## Important Limitations

The framework currently does NOT model:

* structural crack propagation
* finite element mechanics
* seismic simulation
* sensor-based SHM
* marine salt crystallization transport
* restoration history

Outputs should therefore be interpreted as:

environmental vulnerability prioritization indicators

NOT engineering-grade structural predictions.

---

## Screenshots

(Add dashboard screenshots here later)

---

## Author

Nikhil Raj Soni

B.Arch Student — IIT Roorkee

---

## License

This project is currently intended for academic and research demonstration purposes.
