from fastapi import APIRouter, HTTPException
from app.data.monuments import MONUMENT_TRAITS
from app.services.nasa_service import fetch_nasa_climate_data
from app.services.risk_engine import compute_climate_indices, compute_environmental_risk

router = APIRouter()

@router.get("/analyze/{monument_name}")
def analyze_monument(monument_name: str):
    """
    Computes and returns the environmental vulnerability assessment for a specified monument,
    integrating live NASA POWER telemetry.
    """
    # Normalize input
    name_key = monument_name.lower().replace("-", "_").replace(" ", "_")
    
    if name_key not in MONUMENT_TRAITS:
        raise HTTPException(
            status_code=404, 
            detail=f"Monument '{monument_name}' not found in local dataset."
        )
        
    traits = MONUMENT_TRAITS[name_key]
    lat = traits["lat"]
    lon = traits["lon"]
    
    # 1. Fetch live geospatial telemetry
    try:
        raw_nasa_data = fetch_nasa_climate_data(lat, lon)
    except Exception as e:
        # Catching connection errors or JSON parsing errors gracefully
        raise HTTPException(
            status_code=503,
            detail=f"Failed to fetch environmental telemetry from NASA POWER: {str(e)}"
        )
        
    # 2. Compute standardized environmental indices from raw data
    climate_indices = compute_climate_indices(raw_nasa_data)
    
    # 3. Execute deterministic scientific computation with parametric modifiers
    analysis = compute_environmental_risk(climate_indices, traits)
    
    return {
        "monument": traits["name"],
        "climateScore": analysis["climateScore"],
        "finalRisk": analysis["finalRisk"],
        "riskLevel": analysis["riskLevel"],
        "indices": analysis["indices"],
        "modifiers": analysis["modifiers"],
        "traits": traits,
        "telemetry_source": "NASA POWER API (Daily)"
    }
