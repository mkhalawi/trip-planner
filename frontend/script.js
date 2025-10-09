const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const CITIES = [
  "Abu Dhabi",
  "Accra",
  "Addis Ababa",
  "Amsterdam",
  "Ankara",
  "Antalya",
  "Athens",
  "Auckland",
  "Baghdad",
  "Bali",
  "Bangkok",
  "Barcelona",
  "Beijing",
  "Beirut",
  "Belgrade",
  "Berlin",
  "Bern",
  "Bogotá",
  "Boston",
  "Bratislava",
  "Brisbane",
  "Brussels",
  "Bucharest",
  "Budapest",
  "Buenos Aires",
  "Cairo",
  "Calgary",
  "Cape Town",
  "Casablanca",
  "Chengdu",
  "Chicago",
  "Chiang Mai",
  "Copenhagen",
  "Da Nang",
  "Dallas",
  "Delhi",
  "Dhaka",
  "Doha",
  "Dubai",
  "Dublin",
  "Edinburgh",
  "Florence",
  "Frankfurt",
  "Fukuoka",
  "Geneva",
  "Glasgow",
  "Guangzhou",
  "Hamburg",
  "Hanoi",
  "Havana",
  "Helsinki",
  "Ho Chi Minh City",
  "Hong Kong",
  "Honolulu",
  "Houston",
  "Istanbul",
  "Jakarta",
  "Jerusalem",
  "Johannesburg",
  "Kathmandu",
  "Kigali",
  "Kingston",
  "Kolkata",
  "Kuala Lumpur",
  "Kuwait City",
  "Kyoto",
  "La Paz",
  "Lagos",
  "Lahore",
  "Las Vegas",
  "Lima",
  "Lisbon",
  "Ljubljana",
  "London",
  "Los Angeles",
  "Luxor",
  "Lyon",
  "Macau",
  "Madrid",
  "Manama",
  "Manila",
  "Maputo",
  "Marrakesh",
  "Marseille",
  "Melbourne",
  "Mexico City",
  "Miami",
  "Milan",
  "Montréal",
  "Moscow",
  "Mumbai",
  "Munich",
  "Nairobi",
  "Naples",
  "New Delhi",
  "New York",
  "Nice",
  "Osaka",
  "Oslo",
  "Ottawa",
  "Palma de Mallorca",
  "Paris",
  "Perth",
  "Phnom Penh",
  "Phuket",
  "Prague",
  "Quebec City",
  "Quito",
  "Reykjavík",
  "Riga",
  "Rio de Janeiro",
  "Riyadh",
  "Rome",
  "San Diego",
  "San Francisco",
  "San José",
  "San Juan",
  "Santiago",
  "São Paulo",
  "Sapporo",
  "Seattle",
  "Seoul",
  "Seville",
  "Shanghai",
  "Shenzhen",
  "Siem Reap",
  "Singapore",
  "Stockholm",
  "Sydney",
  "Taipei",
  "Tallinn",
  "Tbilisi",
  "Tehran",
  "Tel Aviv",
  "Thessaloniki",
  "Tokyo",
  "Toronto",
  "Valencia",
  "Vancouver",
  "Venice",
  "Vienna",
  "Vilnius",
  "Warsaw",
  "Washington, D.C.",
  "Wellington",
  "Xi'an",
  "Yerevan",
  "Zagreb",
  "Zürich",
];

const MAX_DESTINATIONS = 5;
const listInputValues = new Map();

function setCurrentYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

function getNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && value !== "" ? parsed : null;
}

function createBadge(text) {
  const span = document.createElement("span");
  span.className = "badge";
  span.textContent = text;
  return span;
}

function renderActivities(list, container) {
  container.innerHTML = "";
  if (!list || list.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No suggestions provided.";
    container.append(empty);
    return;
  }

  list.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.name;
    if (item.category) {
      li.append(createBadge(item.category));
    }
    if (item.duration_hours) {
      li.append(createBadge(`${item.duration_hours}h`));
    }
    container.append(li);
  });
}

function renderDining(list, container) {
  container.innerHTML = "";
  if (!list || list.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No dining picks today.";
    container.append(empty);
    return;
  }

  list.forEach((place) => {
    const li = document.createElement("li");
    const parts = [place.name];
    if (place.cuisine) parts.push(place.cuisine);
    if (place.price_level) parts.push(`Price: ${place.price_level}`);
    li.textContent = parts.join(" • ");
    container.append(li);
  });
}

let resultsContainer = null;
let emptyState = null;
let emptyStateTitle = null;
let emptyStateBody = null;
let emptyStateIcon = null;
let emptyStateDefaults = null;
let destinationListEl = null;
let addDestinationBtn = null;
let destinationTemplate = null;

function populateDatalist(id, values) {
  const datalist = document.getElementById(id);
  if (!datalist) return;
  datalist.innerHTML = "";
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    datalist.append(option);
  });
}

function getChipSelections(groupName, scope = document) {
  const group = scope.querySelector(`[data-chip-group="${groupName}"]`);
  if (!group) return [];
  return Array.from(group.querySelectorAll('input[type="checkbox"]:checked')).map(
    (input) => input.value
  );
}

function initListInput(element) {
  if (!element) return;
  const field = element.dataset.field;
  if (!field) return;
  const chipsContainer = element.querySelector(".list-input__chips");
  const textInput = element.querySelector('input[type="text"]');
  const addButton = element.querySelector(".list-input__add");
  if (!chipsContainer || !textInput || !addButton) return;

  const values = listInputValues.get(field) || [];
  listInputValues.set(field, values);

  function render() {
    chipsContainer.innerHTML = "";
    if (!values.length) {
      const placeholder = document.createElement("span");
      placeholder.className = "list-input__placeholder";
      placeholder.textContent = "No considerations added yet.";
      chipsContainer.append(placeholder);
    } else {
      values.forEach((value) => {
        const chip = document.createElement("span");
        chip.className = "list-input__chip";
        chip.setAttribute("role", "listitem");
        const text = document.createElement("span");
        text.textContent = value;
        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "list-input__chip-remove";
        remove.setAttribute("aria-label", `Remove ${value}`);
        remove.textContent = "×";
        remove.addEventListener("click", () => {
          const index = values.indexOf(value);
          if (index >= 0) {
            values.splice(index, 1);
            render();
          }
        });
        chip.append(text, remove);
        chipsContainer.append(chip);
      });
    }
    addButton.disabled = textInput.value.trim().length === 0;
  }

  function addValue() {
    const value = textInput.value.trim();
    if (!value) return;
    if (!values.includes(value)) {
      values.push(value);
    }
    textInput.value = "";
    render();
    textInput.focus();
  }

  addButton.addEventListener("click", addValue);
  textInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addValue();
    }
  });
  textInput.addEventListener("input", () => {
    addButton.disabled = textInput.value.trim().length === 0;
  });

  render();
}

function updateDestinationLabels(listElement) {
  if (!listElement) return;
  Array.from(listElement.querySelectorAll(".destination-entry")).forEach(
    (entry, index) => {
      entry.dataset.destinationIndex = String(index + 1);
      const label = entry.querySelector(".destination-entry__label");
      if (label) {
        label.textContent = `Destination ${index + 1}`;
      }
    }
  );
}

function updateAddDestinationState(listElement, button) {
  if (!listElement || !button) return;
  const count = listElement.querySelectorAll(".destination-entry").length;
  const atLimit = count >= MAX_DESTINATIONS;
  button.disabled = atLimit;
  button.textContent = atLimit
    ? "Destination limit reached"
    : "+ Add another destination";
}

function attachDestinationEvents(entry, listElement, button) {
  const removeBtn = entry.querySelector(".destination-entry__remove");
  if (removeBtn) {
    removeBtn.addEventListener("click", () => {
      entry.remove();
      updateDestinationLabels(listElement);
      updateAddDestinationState(listElement, button);
    });
  }
}

function addDestination(listElement, template, button) {
  if (!listElement || !template || !button) return;
  const count = listElement.querySelectorAll(".destination-entry").length;
  if (count >= MAX_DESTINATIONS) return;
  const node = template.content.firstElementChild.cloneNode(true);
  listElement.append(node);
  updateDestinationLabels(listElement);
  attachDestinationEvents(node, listElement, button);
  const countryInput = node.querySelector('[data-role="destination-country"]');
  if (countryInput) {
    countryInput.focus();
  }
  updateAddDestinationState(listElement, button);
}

function collectDestinations(listElement) {
  if (!listElement) {
    return { destinations: [], hasEmptyCountry: true };
  }
  const entries = Array.from(listElement.querySelectorAll(".destination-entry"));
  const destinations = [];
  let hasEmptyCountry = false;
  entries.forEach((entry) => {
    const countryInput = entry.querySelector('[data-role="destination-country"]');
    const cityInput = entry.querySelector('[data-role="destination-city"]');
    const country = countryInput?.value.trim() || "";
    const city = cityInput?.value.trim() || "";
    if (!country) {
      hasEmptyCountry = true;
    }
    destinations.push({ country, city: city || null });
  });
  return { destinations, hasEmptyCountry };
}

function toggleEmptyState(show) {
  if (!emptyState) return;
  emptyState.classList.toggle("hidden", !show);
}

function setEmptyStateMessage(title, body, icon) {
  if (typeof title === "string" && emptyStateTitle) {
    emptyStateTitle.textContent = title;
  }
  if (typeof body === "string" && emptyStateBody) {
    emptyStateBody.textContent = body;
  }
  if (typeof icon === "string" && emptyStateIcon) {
    emptyStateIcon.textContent = icon;
  }
}

function resetEmptyStateMessage() {
  if (!emptyStateDefaults) return;
  setEmptyStateMessage(
    emptyStateDefaults.title,
    emptyStateDefaults.body,
    emptyStateDefaults.icon
  );
}

function renderPlan(plan) {
  if (!resultsContainer) return;

  resultsContainer.innerHTML = "";
  toggleEmptyState(false);
  resetEmptyStateMessage();

  const overview = document.createElement("div");
  overview.className = "result-card overview-card";
  const overviewHeading = document.createElement("h3");
  overviewHeading.textContent = "Overview";
  const overviewBody = document.createElement("p");
  overviewBody.textContent = plan.general_description || plan.summary || "";
  overview.append(overviewHeading, overviewBody);
  resultsContainer.append(overview);

  if (Array.isArray(plan.flights_transportation_overview) && plan.flights_transportation_overview.length) {
    const flights = document.createElement("div");
    flights.className = "result-card flights";
    const h3 = document.createElement("h3");
    h3.textContent = "Flights & Transportation";
    flights.append(h3);
    const ul = document.createElement("ul");
    plan.flights_transportation_overview.forEach((flight) => {
      const li = document.createElement("li");
      li.textContent = `${flight.carrier} — ${flight.origin} → ${flight.destination}`;
      if (flight.price_total) {
        li.append(
          createBadge(`${flight.price_currency || ""} ${flight.price_total}`.trim())
        );
      }
      if (flight.layovers != null) {
        li.append(createBadge(`${flight.layovers} stop${flight.layovers === 1 ? "" : "s"}`));
      }
      ul.append(li);
    });
    flights.append(ul);
    resultsContainer.append(flights);
  }

  if (plan.estimated_budget) {
    const budget = document.createElement("div");
    budget.className = "result-card budget";
    const h3 = document.createElement("h3");
    h3.textContent = "Budget Estimate";
    budget.append(h3);
    const details = document.createElement("p");
    const b = plan.estimated_budget;
    const perDayGroup = b.per_day_group != null ? `${b.currency || ""} ${b.per_day_group}` : "--";
    const total = b.total_trip_estimate != null ? `${b.currency || ""} ${b.total_trip_estimate}` : "--";
    details.textContent = `Per day (group): ${perDayGroup} • Total trip: ${total}`;
    budget.append(details);
    if (b.notes) {
      const note = document.createElement("p");
      note.textContent = b.notes;
      budget.append(note);
    }
    resultsContainer.append(budget);
  }

  if (Array.isArray(plan.day_by_day) && plan.day_by_day.length) {
    const daysSection = document.createElement("div");
    daysSection.className = "result-card days-section";
    const heading = document.createElement("h3");
    heading.textContent = "Day-by-day adventures";
    const blurb = document.createElement("p");
    blurb.textContent = "Each card below includes flexible suggestions for the daytime, evening, and where to dine.";
    daysSection.append(heading, blurb);

    const grid = document.createElement("div");
    grid.className = "days-grid";
    const template = document.getElementById("day-template");

    plan.day_by_day.forEach((day) => {
      const node = template.content.firstElementChild.cloneNode(true);
      node.querySelector(".day-card__number").textContent = `Day ${day.day_number}`;
      node.querySelector(".day-card__title").textContent = day.city || "Daily highlights";
      const subtitlePieces = [];
      if (day.date) subtitlePieces.push(day.date);
      if (day.recommended_accommodation?.name) {
        subtitlePieces.push(day.recommended_accommodation.name);
      }
      node.querySelector(".day-card__subtitle").textContent = subtitlePieces.join(" • ");
      node.querySelector(".day-notes").textContent = day.notes || "";
      renderActivities(day.morning_activities, node.querySelector(".day-activities"));
      renderActivities(day.night_activities, node.querySelector(".night-activities"));
      const dining = [
        ...(day.recommended_restaurants || []),
        ...(day.recommended_cafes || []),
        ...(day.recommended_bars || []),
      ];
      renderDining(dining, node.querySelector(".dining-list"));
      grid.append(node);
    });

    daysSection.append(grid);
    resultsContainer.append(daysSection);
  }

  if (Array.isArray(plan.helpful_apps) && plan.helpful_apps.length) {
    const apps = document.createElement("div");
    apps.className = "result-card apps";
    const h3 = document.createElement("h3");
    h3.textContent = "Helpful Apps";
    apps.append(h3);
    const ul = document.createElement("ul");
    plan.helpful_apps.forEach((app) => {
      const li = document.createElement("li");
      const platforms = (app.platform || []).join(", ");
      li.textContent = platforms ? `${app.name} (${platforms})` : app.name;
      ul.append(li);
    });
    apps.append(ul);
    resultsContainer.append(apps);
  }

  if (Array.isArray(plan.helpful_numbers) && plan.helpful_numbers.length) {
    const essentials = document.createElement("div");
    essentials.className = "result-card essentials";
    const h3 = document.createElement("h3");
    h3.textContent = "Helpful Numbers";
    essentials.append(h3);
    const ul = document.createElement("ul");
    plan.helpful_numbers.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name}: ${item.number}`;
      if (item.description) {
        li.append(createBadge(item.description));
      }
      ul.append(li);
    });
    essentials.append(ul);
    resultsContainer.append(essentials);
  }
}

function buildPayload(form) {
  const data = new FormData(form);
  const rawLanguages = data.get("preferred_languages") || "";
  const languages = rawLanguages
    .split(",")
    .map((lang) => lang.trim())
    .filter(Boolean);

  const { destinations, hasEmptyCountry } = collectDestinations(destinationListEl);
  if (!destinations.length) {
    throw new Error("Please add at least one destination.");
  }
  if (hasEmptyCountry) {
    throw new Error("Please choose a country for each destination.");
  }

  const primaryDestination = destinations[0];
  const accommodationSelections = getChipSelections("accommodation_type", form);
  const topInterests = getChipSelections("top_interests", form);
  const cuisineSelections = getChipSelections("cuisine_preferences", form);
  const healthValues = (listInputValues.get("health_mobility") || []).filter(Boolean);

  const payload = {
    basic: {
      name: data.get("name"),
      home_country: data.get("home_country"),
      home_city: data.get("home_city"),
      preferred_languages: languages,
      age_group: data.get("age_group"),
    },
    destination: {
      country: primaryDestination.country,
      city: primaryDestination.city,
      period_from: data.get("period_from"),
      period_to: data.get("period_to"),
      flexible_dates: Boolean(form.elements.namedItem("flexible_dates")?.checked),
      preferred_transport: data.get("preferred_transport") || null,
    },
    group: {
      group_type: data.get("group_type"),
      adults: getNumber(data.get("adults")) ?? 0,
      children: getNumber(data.get("children")) ?? 0,
      seniors: getNumber(data.get("seniors")) ?? 0,
      pet_accommodation: Boolean(form.elements.namedItem("pet_accommodation")?.checked),
    },
    style: {
      budget: data.get("budget"),
      pace: data.get("pace"),
    },
    optional: {
      accommodation_type: accommodationSelections[0] || null,
      top_interests: topInterests.length ? topInterests : null,
      cuisine_preferences: cuisineSelections[0] || null,
    },
    constraints: {
      budget_range_per_day: getNumber(data.get("budget_per_day")),
      budget_range_per_trip: getNumber(data.get("budget_per_trip")),
      health_mobility: healthValues.length ? healthValues.join(", ") : null,
      work_travel: Boolean(form.elements.namedItem("work_travel")?.checked),
      other: data.get("other") || null,
    },
  };

  payload.destinations = destinations;
  if (destinations.length > 1) {
    payload.additional_destinations = destinations.slice(1);
  }
  if (accommodationSelections.length) {
    payload.optional.accommodation_type_choices = accommodationSelections;
  }
  if (cuisineSelections.length) {
    payload.optional.cuisine_preferences_choices = cuisineSelections;
  }
  if (healthValues.length) {
    payload.constraints.health_mobility_list = healthValues;
  }

  return payload;
}

function attachFormHandler() {
  const form = document.getElementById("trip-form");
  if (!form) return;

  setCurrentYear();

  const statusEl = document.getElementById("status");
  resultsContainer = document.getElementById("results");
  emptyState = document.getElementById("empty-state");
  emptyStateTitle = emptyState?.querySelector("h3") || null;
  emptyStateBody = emptyState?.querySelector("p") || null;
  emptyStateIcon = emptyState?.querySelector(".empty-state__icon") || null;
  if (emptyState && !emptyStateDefaults) {
    emptyStateDefaults = {
      title: emptyStateTitle?.textContent || "",
      body: emptyStateBody?.textContent || "",
      icon: emptyStateIcon?.textContent || "✨",
    };
  }
  const submitBtn = form.querySelector(".submit-btn");

  populateDatalist("country-options", COUNTRIES);
  populateDatalist("city-options", CITIES);

  destinationListEl = document.getElementById("destination-list");
  addDestinationBtn = document.getElementById("add-destination");
  destinationTemplate = document.getElementById("destination-template");

  if (destinationListEl) {
    updateDestinationLabels(destinationListEl);
    Array.from(destinationListEl.querySelectorAll(".destination-entry")).forEach((entry) => {
      attachDestinationEvents(entry, destinationListEl, addDestinationBtn);
    });
  }
  if (addDestinationBtn && destinationTemplate) {
    addDestinationBtn.addEventListener("click", () =>
      addDestination(destinationListEl, destinationTemplate, addDestinationBtn)
    );
    updateAddDestinationState(destinationListEl, addDestinationBtn);
  }

  form.querySelectorAll(".list-input").forEach((element) => initListInput(element));

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    statusEl.textContent = "Planning your trip...";
    statusEl.className = "status";
    statusEl.classList.add("loading");
    setEmptyStateMessage(
      "Crafting your itinerary",
      "Our travel brains are comparing flights, stays, and experiences tailored to you.",
      "🧳"
    );
    toggleEmptyState(true);
    if (resultsContainer) {
      resultsContainer.innerHTML = "";
    }

    let payload;
    try {
      payload = buildPayload(form);
    } catch (error) {
      console.error(error);
      statusEl.textContent = error.message || "Please review the form and try again.";
      statusEl.className = "status error";
      resetEmptyStateMessage();
      toggleEmptyState(false);
      if (submitBtn) submitBtn.disabled = false;
      return;
    }
    if (submitBtn) submitBtn.disabled = true;

    try {
      const response = await fetch("/api/plan-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || "Unable to generate plan.");
      }

      const plan = await response.json();
      statusEl.textContent = "Trip plan generated!";
      statusEl.classList.add("success");
      renderPlan(plan);
    } catch (error) {
      console.error(error);
      statusEl.textContent = error.message || "Unexpected error occurred.";
      statusEl.classList.add("error");
      setEmptyStateMessage(
        "We hit a snag",
        "Please tweak a detail and try again. If the issue persists, refresh the page and submit once more.",
        "⚠️"
      );
      toggleEmptyState(true);
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

document.addEventListener("DOMContentLoaded", attachFormHandler);
