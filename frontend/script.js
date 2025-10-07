function getNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && value !== "" ? parsed : null;
}

function getSelectedValues(select) {
  return Array.from(select.selectedOptions).map((option) => option.value);
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

  const topInterestsSelect = form.elements.namedItem("top_interests");
  const topInterests = getSelectedValues(topInterestsSelect);

  return {
    basic: {
      name: data.get("name"),
      home_country: data.get("home_country"),
      home_city: data.get("home_city"),
      preferred_languages: languages,
      age_group: data.get("age_group"),
    },
    destination: {
      country: data.get("destination_country"),
      city: data.get("destination_city") || null,
      period_from: data.get("period_from"),
      period_to: data.get("period_to"),
      flexible_dates: form.elements.namedItem("flexible_dates").checked,
      preferred_transport: data.get("preferred_transport") || null,
    },
    group: {
      group_type: data.get("group_type"),
      adults: getNumber(data.get("adults")) ?? 0,
      children: getNumber(data.get("children")) ?? 0,
      seniors: getNumber(data.get("seniors")) ?? 0,
      pet_accommodation: form.elements.namedItem("pet_accommodation").checked,
    },
    style: {
      budget: data.get("budget"),
      pace: data.get("pace"),
    },
    optional: {
      accommodation_type: data.get("accommodation_type") || null,
      top_interests: topInterests.length ? topInterests : null,
      cuisine_preferences: data.get("cuisine_preferences") || null,
    },
    constraints: {
      budget_range_per_day: getNumber(data.get("budget_per_day")),
      budget_range_per_trip: getNumber(data.get("budget_per_trip")),
      health_mobility: data.get("health_mobility") || null,
      work_travel: form.elements.namedItem("work_travel").checked,
      other: data.get("other") || null,
    },
  };
}

function attachFormHandler() {
  const form = document.getElementById("trip-form");
  if (!form) return;

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

    const payload = buildPayload(form);
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
