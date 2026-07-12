const routes = window.BLUE_CRANES_ROUTES || [];
const routeGrid = document.querySelector("#routes-grid");
const filterWrap = document.querySelector("#route-filters");
const searchInput = document.querySelector("#route-search");
let activeCategory = "All";

const categories = ["All", ...new Set(routes.map((route) => route.category))];

function routeMeta(route) {
  return [
    `${route.distanceKm}km`,
    `${route.elevationM}m`,
    route.surface,
    route.effort
  ];
}

function renderFilters() {
  filterWrap.innerHTML = categories
    .map((category) => `<button class="filter-chip${category === activeCategory ? " is-active" : ""}" type="button" data-category="${category}">${category}</button>`)
    .join("");
}

function renderRoutes() {
  const query = searchInput.value.trim().toLowerCase();
  const visibleRoutes = routes.filter((route) => {
    const matchesCategory = activeCategory === "All" || route.category === activeCategory;
    const haystack = [route.title, route.category, route.surface, route.effort, route.description].join(" ").toLowerCase();
    return matchesCategory && haystack.includes(query);
  });

  if (visibleRoutes.length === 0) {
    routeGrid.innerHTML = `<p class="empty-routes">No routes match that search.</p>`;
    return;
  }

  routeGrid.innerHTML = visibleRoutes
    .map((route) => `
      <article class="route-card">
        <span class="route-tag">${route.category}</span>
        <h2>${route.title}</h2>
        <ul class="route-meta">
          ${routeMeta(route).map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <p>${route.description}</p>
        <p class="route-start">Starts at ${route.start}</p>
        <a href="${route.stravaUrl}" target="_blank" rel="noreferrer">Open Strava route</a>
      </article>
    `)
    .join("");
}

filterWrap.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderFilters();
  renderRoutes();
});

searchInput.addEventListener("input", renderRoutes);

renderFilters();
renderRoutes();
