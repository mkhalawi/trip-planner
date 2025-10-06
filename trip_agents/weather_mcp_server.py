from __future__ import annotations
from typing import Any, Dict
import httpx
from datetime import date
from fastmcp import FastMCP
from pydantic import BaseModel, Field
import sys

mcp = FastMCP("weather")
OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"
USER_AGENT = "weather_mcp_server/1.0" # Good practice to identify your client

class ForecastArgs(BaseModel):
    lat: float = Field(..., ge=-90.0, le=90.0)
    lon: float = Field(..., ge=-180.0, le=180.0)
    start_date: date
    end_date: date

@mcp.tool()
async def get_forecast(args: ForecastArgs) -> Dict[str, Any]:
    """
    Returns daily min/max temperature and precipitation probability between start_date and end_date.
    
    Uses Pydantic model for argument validation.
    
    Args:
      args: A ForecastArgs object containing lat, lon, start_date, and end_date.
    """
    params = {
        "latitude": args.lat,
        "longitude": args.lon,
        "start_date": args.start_date.isoformat(),
        "end_date": args.end_date.isoformat(),
        "daily": ["temperature_2m_min", "temperature_2m_max", "precipitation_probability_mean"],
        "timezone": "auto",
    }
    
    headers = {"User-Agent": USER_AGENT}
    
    try:
        async with httpx.AsyncClient(timeout=80) as client:
            print("INFO: Fetching forecast from Open-Meteo API.", file=sys.stdout)
            r = await client.get(OPEN_METEO_URL, params=params, headers=headers)
            r.raise_for_status() # Raises an HTTPStatusError for bad responses (4xx or 5xx)
            data = r.json()
    except httpx.RequestError as e:
        print(f"ERROR: Network or request error during API call: {e}", file=sys.stderr)
        # Raise a custom exception or a descriptive error for the client
        raise RuntimeError(f"Could not connect to Open-Meteo API: {e}")
    except httpx.HTTPStatusError as e:
        print(f"ERROR: API request failed with status {e.response.status_code}: {e.response.text}", file=sys.stderr)
        raise RuntimeError(f"Open-Meteo API request failed with status {e.response.status_code}")
    except Exception as e:
        print(f"ERROR: An unexpected error occurred: {e}", file=sys.stderr)
        raise RuntimeError(f"An unexpected server error occurred: {e}")

    # shape to a simpler dict
    days = []
    for i, d in enumerate(data["daily"]["time"]):
        days.append({
            "date": d,
            "temp_min_c": data["daily"]["temperature_2m_min"][i],
            "temp_max_c": data["daily"]["temperature_2m_max"][i],
            "precip_prob_pct": data["daily"]["precipitation_probability_mean"][i]
        })
    print("INFO: Successfully fetched and processed forecast data.", file=sys.stdout)
    return {"location": {"lat": args.lat, "lon": args.lon}, "days": days}

# # # Expose ASGI app for uvicorn CLI
# # app = mcp.app

# # Mount the **Streamable HTTP** ASGI app; it serves under /mcp by default
# app = mcp.streamable_http_app()

if __name__ == "__main__":
    # # Serve as Streamable HTTP MCP on http://localhost:8000/mcp
    # # FastMCP provides a uvicorn app with /mcp route by default
    # # Run:  uvicorn trip_agents.weather_mcp_server:mcp.app --host 0.0.0.0 --port 8000
    # import uvicorn
    # uvicorn.run(app, host="0.0.0.0", port=8000)
    
    #-----------------------
    # Streamable HTTP transport; serves at http://localhost:8000 **with path /mcp**
    # mcp.run(transport="streamable-http", host="0.0.0.0", port=8000)
    print("INFO: Starting weather MCP server...", file=sys.stdout)
    mcp.run(transport="streamable-http")
    #-----------------------
