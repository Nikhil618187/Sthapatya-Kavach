import requests
from datetime import datetime, timedelta

def fetch_nasa_climate_data(lat: float, lon: float):
    """
    Fetches daily climate telemetry from NASA POWER API.
    Retrieves data for the past 365 days to capture a full seasonal cycle.
    """
    # Fetch data for the last year
    end_date = datetime.now() - timedelta(days=5) # NASA POWER has a slight delay
    start_date = end_date - timedelta(days=365)
    
    start_str = start_date.strftime("%Y%m%d")
    end_str = end_date.strftime("%Y%m%d")
    
    url = (
        f"https://power.larc.nasa.gov/api/temporal/daily/point?"
        f"parameters=T2M_MAX,T2M_MIN,RH2M,PRECTOTCORR&"
        f"community=RE&longitude={lon}&latitude={lat}&"
        f"start={start_str}&end={end_str}&format=JSON"
    )
    
    try:
        response = requests.get(url, timeout=15)
        response.raise_for_status()
        data = response.json()
        
        # Safely extract parameter dictionaries
        parameters = data.get("properties", {}).get("parameter", {})
        
        # NASA POWER returns -999.0 for missing data. 
        # We need to filter those out.
        def extract_valid_array(param_dict):
            if not param_dict:
                return []
            return [val for val in param_dict.values() if val != -999.0]

        t_max_arr = extract_valid_array(parameters.get("T2M_MAX", {}))
        t_min_arr = extract_valid_array(parameters.get("T2M_MIN", {}))
        rh_arr = extract_valid_array(parameters.get("RH2M", {}))
        rain_arr = extract_valid_array(parameters.get("PRECTOTCORR", {}))
        
        if not t_max_arr or not t_min_arr or not rh_arr or not rain_arr:
            raise ValueError("NASA POWER returned empty or entirely invalid data arrays.")
            
        return {
            "T2M_MAX": t_max_arr,
            "T2M_MIN": t_min_arr,
            "RH2M": rh_arr,
            "PRECTOTCORR": rain_arr
        }
        
    except requests.exceptions.RequestException as e:
        raise ConnectionError(f"Failed to connect to NASA POWER API: {str(e)}")
    except ValueError as e:
        raise ValueError(f"Data parsing error: {str(e)}")
