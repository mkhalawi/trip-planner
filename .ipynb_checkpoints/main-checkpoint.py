from __future__ import annotations
import asyncio
import os
from datetime import date
from agents import Runner, set_default_openai_api
from agents.mcp import MCPServerStdio
from trip_agents.models import (
    TripRequest, BasicInfo, DestinationInput, GroupCompanies, TravelStyle,
    OptionalInput, PracticalConstraints, SeasonalityOutput, WeatherOutput, VisaFlightsOutput,
    AttractionsOutput, ActivitiesOutput, StaysOutput, DiningOutput, RoutingOutput,
    BudgetOutput, EssentialsOutput, TripPlan
)
from trip_agents.agents import (
    seasonality_agent, visa_flights_agent, attractions_agent,
    activities_agent, stays_agent, dining_agent, routing_agent,
    budget_agent, essentials_agent, composer_agent
)
#weather_agent, weather_mcp_server
from trip_agents.weather_agent import create_weather_agent, WeatherAnalysis
# Use the Responses API (needed for hosted tools like WebSearch & MCP)
set_default_openai_api("responses")  # default is responses already; explicit for clarity.

# # Explicitly connect to the MCP server (required)
# async def init_external_servers():
#     await weather_mcp_server.connect()

async def get_weather_results(req: TripRequest) -> WeatherAnalysis:
    """Run the WeatherAgent to get weather information, managing MCP server lifecycle."""
    print("Initializing and connecting to Weather MCP server...")

    # Define and connect to the MCP server explicitly
    weather_mcp_server = MCPServerStdio(
        params={
            "command": "docker",
            "args": ["run", "--rm", "-i", "mcp_server_weather"],
        },
        client_session_timeout_seconds=60.0  # Set a longer timeout, e.g., 60 seconds
    )
    
    async with weather_mcp_server as server:
        print("Weather MCP server connected. Creating Weather Agent...")
        weather_agent = create_weather_agent(mcp_servers=[server])
        result = await Runner.run(weather_agent, req.model_dump_json())
        weather_info = result.final_output_as(WeatherAnalysis)
        print("Weather information fetched.")
    
    print("Weather MCP server disconnected.")
    return weather_info

    
# Trip Planner Manager Function
async def plan_trip(req: TripRequest) -> TripPlan:
    print("Trip Context")
    print(req.model_dump_json())
    print("\n")
    
    # 1) Seasonality
    print("Fetching seasonality information using Weather Agent...")
    seasonality_res = await Runner.run(seasonality_agent, req.model_dump_json())
    seasonality = seasonality_res.final_output_as(SeasonalityOutput)
    print("seasonality information fetched.")
    print(seasonality.model_dump(mode="json"))
    print("\n")

    # # 2) Weather (MCP) — the weather agent can infer lat/lon from city via the model
    # weather_res = await Runner.run(weather_agent, req.model_dump_json())
    # weather = weather_res.final_output_as(WeatherOutput)
    
    # 2) Weather Analysis
    print("Fetching weather information using Weather Agent...")
    weather = await get_weather_results(req)
    print(weather.model_dump(mode="json"))
    print("\n")

    # 3) Visa & Flights
    print("Fetching visa_flights information using visa_flights Agent...")
    visa_flights_res = await Runner.run(visa_flights_agent, req.model_dump_json())
    visa_flights = visa_flights_res.final_output_as(VisaFlightsOutput)
    print("visa_flights information fetched.")
    print(visa_flights.model_dump(mode="json"))
    print("\n")

    # 4) Attractions
    print("Fetching attractions information using attractions Agent...")
    attractions_res = await Runner.run(attractions_agent, req.model_dump_json())
    attractions = attractions_res.final_output_as(AttractionsOutput)
    print("attractions information fetched.")
    print(attractions.model_dump(mode="json"))
    print("\n")

    # 5) Activities
    print("Fetching activities information using activities Agent...")
    input_string = f"""
    Trip details: {req.model_dump(mode="json")}
    Seasonality: {seasonality.model_dump(mode="json")}
    Weather: {weather.model_dump(mode="json")}
    Attractions: {attractions.model_dump(mode="json")}
    """
    activities_res = await Runner.run(activities_agent, input_string)
    activities = activities_res.final_output_as(ActivitiesOutput)
    print("activities information fetched.")
    print(activities.model_dump(mode="json"))
    print("\n")

    # 6) Stays
    print("Fetching stays information using stays Agent...")
    stays_res = await Runner.run(stays_agent, req.model_dump_json())
    stays = stays_res.final_output_as(StaysOutput)
    print("stays information fetched.")
    print(stays.model_dump(mode="json"))
    print("\n")

    # 7) Dining
    print("Fetching dining information using dining Agent...")
    dining_res = await Runner.run(dining_agent, req.model_dump_json())
    dining = dining_res.final_output_as(DiningOutput)
    print("dining information fetched.")
    print(dining.model_dump(mode="json"))
    print("\n")

    # 8) Routing
    print("Fetching routing information using routing Agent...")
    routing_res = await Runner.run(routing_agent, req.model_dump_json())
    routing = routing_res.final_output_as(RoutingOutput)
    print("routing information fetched.")
    print(routing.model_dump(mode="json"))
    print("\n")

    # 9) Budget
    print("Fetching budget information using budget Agent...")
    input_string = f"""
    "trip": {req.model_dump_json()},
    "flights": {[f.model_dump(mode="json") for f in visa_flights.best_flights]},
    "stays": {stays.model_dump(mode="json")},
    "dining": {dining.model_dump(mode="json")},
    "activities": {activities.model_dump(mode="json")}
    """
    budget_res = await Runner.run(budget_agent, input_string)
    budget = budget_res.final_output_as(BudgetOutput)
    print("budget information fetched.")
    print(budget.model_dump(mode="json"))
    print("\n")

    # 10) Essentials
    print("Fetching essentials information using essentials Agent...")
    essentials_res = await Runner.run(essentials_agent, req.model_dump_json())
    essentials = essentials_res.final_output_as(EssentialsOutput)
    print("essentials information fetched.")
    print(essentials.model_dump(mode="json"))
    print("\n")

    # 11) Compose Final Plan
    print("Fetching Final Plan information using composer Agent...")
    input_string = f"""
    "trip": {req.model_dump_json()},
    "seasonality": {seasonality.model_dump(mode="json")},
    "weather": {weather.model_dump(mode="json")},
    "visa_flights": {visa_flights.model_dump(mode="json")},
    "attractions": {attractions.model_dump(mode="json")},
    "activities": {activities.model_dump(mode="json")},
    "stays": {stays.model_dump(mode="json")},
    "dining": {dining.model_dump(mode="json")},
    "routing": {routing.model_dump(mode="json")},
    "budget": {budget.model_dump(mode="json")},
    "essentials": {essentials.model_dump(mode="json")},
    """
    final_res = await Runner.run(composer_agent,input_string)
    plan = final_res.final_output_as(TripPlan)
    print("Final Plan fetched.")
    print(plan.model_dump(mode="json"))
    print("\n")
    
    return plan

async def demo():
    # Minimal demo input (adjust to taste)
    # await init_external_servers()
    req = TripRequest(
        basic=BasicInfo(
            name="Mohammad",
            home_country="Jordan",
            home_city="Amman",
            preferred_languages=["en","ar"],
            age_group="adult",
        ),
        destination=DestinationInput(
            country="Japan",
            city="Tokyo",
            period_from=date(2026, 4, 10),
            period_to=date(2026, 4, 20),
            flexible_dates=True,
            preferred_transport="mix",
        ),
        group=GroupCompanies(group_type="couple", adults=2),
        style=TravelStyle(budget="mid-range", pace="balanced"),
        optional=OptionalInput(
            accommodation_type="hotels",
            top_interests=["food_culture","history_sightseeing","shopping"],
            cuisine_preferences="mix",
        ),
        constraints=PracticalConstraints(
            budget_range_per_day=250.0,
            health_mobility="no long hikes",
            work_travel=False,
        )
    )

    plan = await plan_trip(req)
    print("=== Trip Plan Summary ===")
    print(plan.summary)
    print(f"Days planned: {len(plan.day_by_day)}")

if __name__ == "__main__":
    # Ensure OPENAI_API_KEY is set in the environment
    # assert os.getenv("OPENAI_API_KEY"), "Set OPENAI_API_KEY first."
    asyncio.run(demo())
