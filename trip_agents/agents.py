from __future__ import annotations
from typing import Any, List
from agents import Agent, WebSearchTool
from agents.model_settings import ModelSettings
from agents.mcp import MCPServerStreamableHttp  # local MCP transport (HTTP streaming)
from .models import (
    TripRequest, SeasonalityOutput, WeatherOutput, VisaFlightsOutput, AttractionsOutput,
    ActivitiesOutput, StaysOutput, DiningOutput, RoutingOutput, BudgetOutput, EssentialsOutput,
    TripPlan, DayPlan, WeatherDaily, BudgetBreakdown
)
from datetime import datetime
from dateutil import parser as dateparser

# Shared model settings: encourage tool use & citations
DEFAULT_MODEL_SETTINGS = ModelSettings(
    # You can set model, temperature, etc., if you want (Responses API model)
    tool_choice="auto"
)

# ===== Agent: Seasonality / calendar advisor =====
seasonality_agent = Agent(
    name="SeasonalityAdvisor",
    handoff_description="Evaluates destination seasonality, holidays, hazards, best-times-to-visit windows.",
    instructions=(
        "You analyze the destination's general seasonality (peak/shoulder/off), major holidays/events, "
        "and climate hazards for the requested period. Return 2-5 date windows with labels and rationales."
    ),
    tools=[WebSearchTool()],  # can look up holiday calendars/festivals
    output_type=SeasonalityOutput,
    model_settings=DEFAULT_MODEL_SETTINGS,
)

# ===== Agent: Weather (MCP) =====
# Connect to the local Streamable HTTP MCP server (weather_mcp_server.py) at http://localhost:8000/mcp
weather_mcp_server = MCPServerStreamableHttp(
    name="LocalWeatherMCP",
    params={"url": "http://127.0.0.1:8000"},
    cache_tools_list=True,
)

weather_agent = Agent(
    name="WeatherAgent",
    handoff_description="Calls Weather MCP to fetch daily forecast for the trip period and summarizes.",
    instructions=(
        "Use the MCP tool 'get_forecast' (lat/lon known or estimated from city) to fetch daily forecast "
        "for the trip dates. Summarize weather and convert to WeatherOutput."
    ),
    mcp_servers=[weather_mcp_server],
    output_type=WeatherOutput,
    model_settings=DEFAULT_MODEL_SETTINGS,
)

# ===== Agent: Visa & Flights =====
visa_flights_agent = Agent(
    name="VisaFlightsAgent",
    handoff_description="Checks visa requirement (home->destination) and finds 3-6 good flight options.",
    instructions=(
        "Use web search to check visa requirements (official gov or airline sources). "
        "Then find a handful of well-balanced flight options (price vs duration) "
        "and provide structured results with bookable URLs when possible."
    ),
    tools=[WebSearchTool()],
    output_type=VisaFlightsOutput,
    model_settings=DEFAULT_MODEL_SETTINGS,
)

# ===== Agent: Attractions =====
attractions_agent = Agent(
    name="AttractionsAgent",
    handoff_description="Compiles top attractions/landmarks/activities per city.",
    instructions=(
        "Search the web for top attractions, landmarks, neighborhoods, museums, and must-do activities "
        "for the destination (and nearby cities if relevant). Include durations and ticket flags."
    ),
    tools=[WebSearchTool()],
    output_type=AttractionsOutput,
    model_settings=DEFAULT_MODEL_SETTINGS,
)

# ===== Agent: Activities curator =====
activities_agent = Agent(
    name="ActivitiesAgent",
    handoff_description="Personalizes activities to fit group, style, weather, and seasonality.",
    instructions=(
        "From attractions and trip context, pick activities matched to group (couple, family, seniors, etc.), "
        "pace, and weather constraints. Exclude activities unsuitable for mobility/health constraints. "
        "Return 10-20 candidate activities with suitability + weather fit."
    ),
    tools=[],
    output_type=ActivitiesOutput,
    model_settings=DEFAULT_MODEL_SETTINGS,
)

# ===== Agent: Stays (accommodations) =====
stays_agent = Agent(
    name="StaysAgent",
    handoff_description="Recommends accommodations by city, area, and budget.",
    instructions=(
        "Match accommodation type/budget. If trip.constraints.work_travel is true, "
        "prioritize properties with reliable Wi-Fi and a quiet workspace/desk; call this out in notes. "
        "Prefer central, transit-friendly neighborhoods. Include nightly_estimate and URL."
    ),
    tools=[WebSearchTool()],
    output_type=StaysOutput,
    model_settings=DEFAULT_MODEL_SETTINGS,
)

# ===== Agent: Dining (restaurants/cafes/bars) =====
dining_agent = Agent(
    name="DiningAgent",
    handoff_description="Recommends restaurants, cafes, and bars aligned to cuisine prefs and budget.",
    instructions=(
        "Search for reputable restaurants/cafes/bars with cuisine tags and price levels. "
        "Favor high-signal sources (official pages, established reviewers)."
    ),
    tools=[WebSearchTool()],
    output_type=DiningOutput,
    model_settings=DEFAULT_MODEL_SETTINGS,
)

# ===== Agent: Routing (intercity transport) =====
routing_agent = Agent(
    name="RoutingAgent",
    handoff_description="Picks best transport modes and legs between cities/regions in the plan.",
    instructions=(
        "Propose intercity routing consistent with preferred transport and constraints. "
        "Estimate durations and add provider notes when helpful."
    ),
    tools=[WebSearchTool()],
    output_type=RoutingOutput,
    model_settings=DEFAULT_MODEL_SETTINGS,
)

# ===== Agent: Budget estimator =====
budget_agent = Agent(
    name="BudgetAgent",
    handoff_description="Builds a simple budget model from flights, stays, activities, and dining.",
    instructions=(
        "Create a budget breakdown with currency, per-day per-person, per-day group, and total trip estimate. "
        "Base estimates on mid-market prices in results; explain assumptions briefly."
    ),
    tools=[],
    output_type=BudgetOutput,
    model_settings=DEFAULT_MODEL_SETTINGS,
)

# ===== Agent: Essentials (apps, numbers, health/safety) =====
essentials_agent = Agent(
    name="EssentialsAgent",
    handoff_description="Compiles useful apps, numbers, packing tips, shots, cautions.",
    instructions=(
        "Provide useful apps, numbers, packing tips. "
        "If trip.constraints.work_travel is true, add coworking suggestions, eSIM/data options, "
        "and etiquette for working from cafés."
    ),
    tools=[WebSearchTool()],
    output_type=EssentialsOutput,
    model_settings=DEFAULT_MODEL_SETTINGS,
)

# ===== Agent: Composer (final trip plan) =====
composer_agent = Agent(
    name="PlanComposer",
    handoff_description="Composes the final day-by-day plan with all components.",
    instructions=(
        "Synthesize seasonality, weather, flights, stays, dining, activities, routing, budget, essentials. "
        "Output a TripPlan where each day includes: day_number, date, city, recommended_accommodation, "
        "morning_activities, night_activities, recommended_restaurants, recommended_cafes, "
        "recommended_bars, notes.\n"
        "The AI may choose to keep the same accommodation across days or switch—no manual grouping requirement.\n"
        "Ensure fields are populated; if any info is missing, infer reasonably and note assumptions."
    ),
    tools=[],
    output_type=TripPlan,
    model_settings=DEFAULT_MODEL_SETTINGS,
)
