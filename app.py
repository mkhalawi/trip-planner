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

    plan = await plan_trip(trip_request)
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
