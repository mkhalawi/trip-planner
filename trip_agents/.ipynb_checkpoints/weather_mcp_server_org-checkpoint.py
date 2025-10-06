from __future__ import annotations
from typing import Any, Dict
import httpx
from datetime import date
from mcp.server.fastmcp import FastMCP
from pydantic import BaseModel

mcp = FastMCP("weather")
OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"

class ForecastArgs(BaseModel):
    lat: float
    lon: float
    start_date: date
    end_date: date

@mcp.tool()
async def get_forecast(lat: float, lon: float, start_date: str, end_date: str) -> Dict[str, Any]:
    """
    Returns daily min/max temperature and precipitation probability between start_date and end_date.

    Args:
      lat: latitude
      lon: longitude
      start_date: ISO date (YYYY-MM-DD)
      end_date: ISO date (YYYY-MM-DD)
    """
    params = {
        "latitude": lat,
        "longitude": lon,
        "start_date": start_date,
        "end_date": end_date,
        "daily": ["temperature_2m_min","temperature_2m_max","precipitation_probability_mean"],
        "timezone": "auto",
    }
    async with httpx.AsyncClient(timeout=80) as client:
        r = await client.get(OPEN_METEO_URL, params=params)
        r.raise_for_status()
        data = r.json()
    # shape to a simpler dict
    days = []
    for i, d in enumerate(data["daily"]["time"]):
        days.append({
            "date": d,
            "temp_min_c": data["daily"]["temperature_2m_min"][i],
            "temp_max_c": data["daily"]["temperature_2m_max"][i],
            "precip_prob_pct": data["daily"]["precipitation_probability_mean"][i]
        })
    return {"location": {"lat": lat, "lon": lon}, "days": days}

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
    mcp.run(transport="streamable-http")
    #-----------------------
