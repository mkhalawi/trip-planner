from __future__ import annotations
from pydantic import BaseModel, Field, HttpUrl, conlist
from typing import List, Optional, Literal, Dict
from datetime import date

# ---------- Core user input ----------
class BasicInfo(BaseModel):
    name: str
    home_country: str
    home_city: str
    preferred_languages: List[str]
    age_group: Literal["child","teen","adult","senior"]

class DestinationInput(BaseModel):
    country: str
    city: Optional[str] = None
    period_from: date
    period_to: date
    flexible_dates: bool = False
    preferred_transport: Optional[Literal["airplane","train","bus","car","mix"]] = None

class GroupCompanies(BaseModel):
    group_type: Literal["solo","couple","group_of_friends","family"]
    adults: int = 1
    children: int = 0
    seniors: int = 0
    pet_accommodation: bool = False

class TravelStyle(BaseModel):
    budget: Literal["luxury","mid-range","budget"]
    pace: Literal["relaxed","balanced","intensive"]

class OptionalInput(BaseModel):
    accommodation_type: Optional[Literal["hotels","resorts","apartment_airbnb","mix"]] = None
    top_interests: Optional[List[Literal[
        "beaches_water","history_sightseeing","food_culture","music_festivals",
        "relaxing_wellness","shopping","nature_wildlife","nightlife","adventure_hikes"
    ]]] = None
    cuisine_preferences: Optional[Literal["local","international","street_food","fine_dining","mix"]] = None

class PracticalConstraints(BaseModel):
    budget_range_per_day: Optional[float] = None
    budget_range_per_trip: Optional[float] = None
    health_mobility: Optional[str] = None  # e.g. wheelchair, no long hikes, allergies
    work_travel: bool = False       # e.g. needs wifi, desk
    other: Optional[str] = None

class TripRequest(BaseModel):
    basic: BasicInfo
    destination: DestinationInput
    group: GroupCompanies
    style: TravelStyle
    optional: OptionalInput = OptionalInput()
    constraints: PracticalConstraints = PracticalConstraints()

# ---------- Shared domain objects ----------
class FlightOption(BaseModel):
    carrier: str
    origin: str
    destination: str
    depart_time_local: str
    arrive_time_local: str
    price_currency: str
    price_total: float
    cabin: Optional[str] = None
    layovers: int = 0
    # booking_url: Optional[HttpUrl] = None
    booking_url: Optional[str] = None

class VisaRequirement(BaseModel):
    required: bool
    notes: str

class WeatherDaily(BaseModel):
    date: date
    summary: str
    temp_min_c: float
    temp_max_c: float
    precip_prob_pct: Optional[int] = None

class SeasonalityWindow(BaseModel):
    label: Literal["peak","shoulder","off","hazardous"]
    from_date: date
    to_date: date
    rationale: str

class Attraction(BaseModel):
    name: str
    city: str
    category: str
    description: str
    typical_duration_hours: float
    ticket_required: bool = False
    # url: Optional[HttpUrl] = None
    url: Optional[str] = None

class ActivitySuggestion(BaseModel):
    name: str
    city: str
    category: str
    suitability: List[str] # e.g. ["family","couple","senior_friendly"]
    weather_fit: str       # e.g. "indoor on rainy", "cool mornings"
    duration_hours: float

class StayOption(BaseModel):
    name: str
    city: str
    type: str  # hotel, resort, apartment
    neighborhood: Optional[str] = None
    nightly_estimate: float
    currency: str
    # url: Optional[HttpUrl] = None
    url: Optional[str] = None
    notes: Optional[str] = None

class DiningOption(BaseModel):
    name: str
    city: str
    type: Literal["restaurant","cafe","bar"]
    cuisine: Optional[str] = None
    price_level: Optional[Literal["$","$$","$$$","$$$$"]] = None
    # reservation_url: Optional[HttpUrl] = None
    reservation_url: Optional[str] = None

class TransportLeg(BaseModel):
    mode: Literal["airplane","train","bus","car","ferry","walk","metro","rideshare"]
    from_city: str
    to_city: str
    est_duration_min: int
    provider_note: Optional[str] = None

class DayPlan(BaseModel):
    day_number: int
    date: date
    city: str
    recommended_accommodation: Optional[StayOption] = None
    morning_activities: conlist(ActivitySuggestion, min_length=0) = []
    night_activities: conlist(ActivitySuggestion, min_length=0) = []
    recommended_restaurants: List[DiningOption] = []
    recommended_cafes: List[DiningOption] = []
    recommended_bars: List[DiningOption] = []
    notes: Optional[str] = None

class BudgetBreakdown(BaseModel):
    currency: str
    per_day_per_person: float
    per_day_group: float
    total_trip_estimate: float
    notes: Optional[str] = None

class UsefulApp(BaseModel):
    name: str
    category: str   # taxi, food, tourism, navigation
    platform: List[Literal["iOS","Android"]]
    # url: Optional[HttpUrl] = None
    url: Optional[str] = None

class UsefulNumber(BaseModel):
    name: str
    number: str
    description: Optional[str] = None

# ---------- Agent outputs ----------
class SeasonalityOutput(BaseModel):
    windows: List[SeasonalityWindow]
    advisories: Optional[str] = None

class WeatherOutput(BaseModel):
    daily: List[WeatherDaily]
    overall_summary: str

class VisaFlightsOutput(BaseModel):
    visa: VisaRequirement
    best_flights: List[FlightOption]

class AttractionsOutput(BaseModel):
    attractions: List[Attraction]

class ActivitiesOutput(BaseModel):
    suggested: List[ActivitySuggestion]

class StaysOutput(BaseModel):
    stays: List[StayOption]

class DiningOutput(BaseModel):
    dining: List[DiningOption]  # restaurants/cafes/bars together; type field discriminates

class RoutingOutput(BaseModel):
    intercity: List[TransportLeg]

class BudgetOutput(BaseModel):
    budget: BudgetBreakdown

class EssentialsOutput(BaseModel):
    useful_apps: List[UsefulApp]
    useful_numbers: List[UsefulNumber]
    packing_tips: Optional[str] = None
    health_injections: Optional[str] = None
    cautions_warnings: Optional[str] = None

class TripPlan(BaseModel):
    general_description: str
    flights_transportation_overview: List[FlightOption]
    day_by_day: List[DayPlan]
    best_routes: List[TransportLeg]
    estimated_budget: BudgetBreakdown
    helpful_apps: List[UsefulApp]
    helpful_numbers: List[UsefulNumber]
    summary: str
    