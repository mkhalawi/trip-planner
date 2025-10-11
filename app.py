from __future__ import annotations

import json
from pathlib import Path

from pydantic import ValidationError
from starlette.applications import Starlette
from starlette.responses import FileResponse, JSONResponse
from starlette.routing import Mount, Route
from starlette.staticfiles import StaticFiles

from main import plan_trip
from trip_agents.models import TripRequest

try:
    from openai import OpenAIError
except ImportError:  # pragma: no cover - fallback if package layout changes
    OpenAIError = Exception

BASE_DIR = Path(__file__).resolve().parent
FRONTEND_DIR = BASE_DIR / "frontend"


async def homepage(request):
    return FileResponse(FRONTEND_DIR / "index.html")


async def plan_trip_handler(request):
    try:
        payload = await request.json()
    except json.JSONDecodeError:
        return JSONResponse({"error": "Invalid JSON payload."}, status_code=400)

    try:
        trip_request = TripRequest.model_validate(payload)
    except ValidationError as exc:
        return JSONResponse({"error": "Invalid trip request.", "details": exc.errors()}, status_code=422)

    try:
        plan = await plan_trip(trip_request)
    except OpenAIError as exc:
        return JSONResponse(
            {
                "error": "Unable to contact the AI planner.",
                "details": (
                    "The backend requires a valid OPENAI_API_KEY environment variable "
                    "to generate itineraries. Please set it and restart the server."
                    if "api_key" in str(exc).lower()
                    else str(exc)
                ),
            },
            status_code=500,
        )
    except Exception as exc:  # pragma: no cover - catch-all for unexpected failures
        return JSONResponse(
            {
                "error": "Failed to generate the trip plan.",
                "details": str(exc),
            },
            status_code=500,
        )

    return JSONResponse(plan.model_dump(mode="json"))


routes = [
    Route("/", homepage),
    Route("/api/plan-trip", plan_trip_handler, methods=["POST"]),
    Mount("/static", app=StaticFiles(directory=FRONTEND_DIR), name="static"),
]

app = Starlette(debug=False, routes=routes)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
