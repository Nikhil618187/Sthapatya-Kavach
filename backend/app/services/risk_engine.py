# Finalized Parametric Modifier Maps
# These act as scalars on the baseline climate stress

MATERIAL_MAP = {
    "granite": 0.05,      # Highly resistant to mechanical weathering
    "basalt": 0.08,       # Resistant, but susceptible to chemical alteration
    "marble": 0.15,       # Vulnerable to acid rain and sulfation
    "sandstone": 0.20,    # High porosity, vulnerable to salt crystallization
    "khondalite": 0.25    # Highly vulnerable to weathering and biological growth
}

STRUCTURE_MAP = {
    "dome": 0.10,         # Stable geometry, but large exposed surface
    "arch": 0.12,         # Point-loading stresses
    "tower": 0.15,        # Wind shear and lateral exposure
    "temple": 0.18,       # Complex geometry, water retention points
    "ruins": 0.25         # Unprotected core material, lacking structural cohesion
}

SOIL_MAP = {
    "rocky": 0.02,        # Stable foundation
    "alluvial": 0.10,     # Moderate settlement risk
    "sandy": 0.15,        # High permeability, risk of washout
    "coastal": 0.20       # Saline groundwater, tidal erosion risk
}

POLLUTION_MAP = {
    "low": 0.05,          # Baseline atmospheric deposition
    "moderate": 0.15,     # Noticeable particulate matter and SO2
    "high": 0.30          # Severe industrial/urban emission exposure
}

def compute_climate_indices(nasa_data: dict) -> dict:
    """
    Computes environmental vulnerability indices directly from NASA daily telemetry arrays.
    Returns normalized values (0-100) for UI charting and downstream risk computation.
    """
    import math
    
    t_max = nasa_data["T2M_MAX"]
    t_min = nasa_data["T2M_MIN"]
    rh = nasa_data["RH2M"]
    rain = nasa_data["PRECTOTCORR"]
    
    days = min(len(t_max), len(t_min), len(rh), len(rain))
    if days == 0:
        return {"tfi": 0, "mvi": 0, "rii": 0, "sat": 0, "ssi": 0}

    # 1. Thermal Fatigue Index (TFI): mean((Tmax - Tmin)^2)
    tfi_raw = sum((t_max[i] - t_min[i])**2 for i in range(days)) / days
    tfi_norm = min(100.0, (tfi_raw / 400.0) * 100) # Assuming max severe variation ~20C squared=400
    
    # 2. Moisture Vulnerability Index (MVI): mean(max(0, RH - 75))
    mvi_raw = sum(max(0, rh[i] - 75) for i in range(days)) / days
    mvi_norm = min(100.0, (mvi_raw / 25.0) * 100) # Max average excess humidity ~25%
    
    # 3. Rain Impact Index (RII): mean(rain^1.5)
    rii_raw = sum((rain[i])**1.5 for i in range(days)) / days
    rii_norm = min(100.0, (rii_raw / 50.0) * 100) # Scaling kinetic energy proxy
    
    # 4. Saturation Index (SAT): wet days ratio
    wet_days = sum(1 for r in rain if r > 1.0)
    sat_norm = (wet_days / days) * 100.0
    
    # 5. Seasonal Shock Index (SSI): seasonal transition stress
    # Aggregate daily data into 12 monthly blocks
    chunk_size = max(1, days // 12)
    t_monthly_means = []
    rh_monthly_means = []
    
    for i in range(12):
        start_idx = i * chunk_size
        end_idx = (i + 1) * chunk_size if i < 11 else days
        
        t_chunk = t_max[start_idx:end_idx]
        rh_chunk = rh[start_idx:end_idx]
        
        t_monthly_means.append(sum(t_chunk) / len(t_chunk) if t_chunk else 0)
        rh_monthly_means.append(sum(rh_chunk) / len(rh_chunk) if rh_chunk else 0)

    # Compute month-to-month transitions
    transition_stresses = []
    for i in range(1, 12):
        t_diff = abs(t_monthly_means[i] - t_monthly_means[i-1])
        rh_diff = abs(rh_monthly_means[i] - rh_monthly_means[i-1])
        transition_stresses.append(t_diff + (0.5 * rh_diff))
        
    ssi_raw = sum(transition_stresses) / len(transition_stresses) if transition_stresses else 0
    ssi_norm = min(100.0, (ssi_raw / 10.0) * 100) # Scaling empirical transition proxy
    
    return {
        "tfi": round(tfi_norm, 1),
        "mvi": round(mvi_norm, 1),
        "rii": round(rii_norm, 1),
        "sat": round(sat_norm, 1),
        "ssi": round(ssi_norm, 1)
    }

def compute_environmental_risk(climate_indices: dict, monument_traits: dict) -> dict:
    """
    Deterministic computation of environmental vulnerability.
    Uses additive modifier logic applied to a baseline climate stress score.
    """
    # Compute baseline climate score (simple average of indices)
    # Indices: TFI, MVI, RII, SAT, SSI
    base_climate = sum(climate_indices.values()) / len(climate_indices)
    
    # Extract parametric modifiers
    mat_effect = MATERIAL_MAP.get(monument_traits["material"], 0.1)
    str_effect = STRUCTURE_MAP.get(monument_traits["structure"], 0.1)
    soil_effect = SOIL_MAP.get(monument_traits["soil"], 0.1)
    pol_effect = POLLUTION_MAP.get(monument_traits["pollution"], 0.1)
    
    # Deterministic Risk Equation: Risk = Base * (1 + sum(modifiers))
    # Additive logic ensures no compounding explosions inherent in multiplicative stacking
    total_modifier_penalty = mat_effect + str_effect + soil_effect + pol_effect
    final_risk = base_climate * (1.0 + total_modifier_penalty)
    
    # Cap the final risk strictly at 100
    final_risk = min(100.0, final_risk)
    
    # Interpretative Risk Categorization
    if final_risk >= 75.0:
        risk_level = "HIGH"
    elif final_risk >= 50.0:
        risk_level = "MODERATE"
    else:
        risk_level = "LOW"
        
    return {
        "climateScore": round(base_climate, 2),
        "finalRisk": round(final_risk, 2),
        "riskLevel": risk_level,
        "indices": climate_indices,
        "modifiers": {
            "material": mat_effect,
            "structure": str_effect,
            "soil": soil_effect,
            "pollution": pol_effect,
            "total_penalty": round(total_modifier_penalty, 2)
        }
    }
