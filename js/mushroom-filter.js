const cards = document.querySelectorAll(".mushroom-guide .grid-auto-fill > .card");
const seasonFilter = document.querySelector("#season");
const edibleFilter = document.querySelector("#edible");
const searchInput = document.querySelector("#mushroom-search");

const cardRows = Array.from(cards, (card) => {
  const seasonEl = card.querySelector("[data-season]");
  const edibleEl = card.querySelector("[data-edible]");
  return {
    card,
    season: seasonEl.dataset.season,
    edible: edibleEl.dataset.edible,
  };
});

const currentFilters = {
  season: "all",
  edible: "all",
  search: "",
};

const SEARCH_DEBOUNCE_MS = 150;
let searchDebounceId = 0;

function flushSearchFilter() {
  window.clearTimeout(searchDebounceId);
  searchDebounceId = 0;
  currentFilters.search = searchInput.value;
  runWithViewTransition(filterCards);
}

function runWithViewTransition(updateFn) {
  if (typeof document.startViewTransition !== "function") {
    updateFn();
    return;
  }
  const transition = document.startViewTransition(updateFn);
  const swallowAbort = (err) => {
    if (err && err.name !== "AbortError") {
      console.error(err);
    }
  };
  transition.ready.catch(swallowAbort);
  transition.updateCallbackDone.catch(swallowAbort);
  transition.finished.catch(swallowAbort);
}

cards.forEach((card, index) => {
  const mushroomId = `mushroom-${index + 1}`;
  card.style.viewTransitionName = `card-${mushroomId}`;
});

seasonFilter.addEventListener("change", function () {
  currentFilters.season = this.value;
  runWithViewTransition(filterCards);
});
edibleFilter.addEventListener("change", function () {
  currentFilters.edible = this.value;
  runWithViewTransition(filterCards);
});

searchInput.addEventListener("input", function () {
  currentFilters.search = this.value;
  window.clearTimeout(searchDebounceId);
  searchDebounceId = window.setTimeout(() => {
    searchDebounceId = 0;
    runWithViewTransition(filterCards);
  }, SEARCH_DEBOUNCE_MS);
});
searchInput.addEventListener("blur", flushSearchFilter);
searchInput.addEventListener("search", flushSearchFilter);

function normalizeSearch(query) {
  return query.trim().toLowerCase();
}

function cardMatchesSearch(card, normalizedQuery) {
  if (!normalizedQuery) return true;
  return card.textContent.toLowerCase().includes(normalizedQuery);
}

function filterCards() {
  const normalizedQuery = normalizeSearch(currentFilters.search);
  let hasvisibleCards = false;
  for (let i = 0; i < cardRows.length; i++) {
    const { card, season, edible } = cardRows[i];
    const show =
      (currentFilters.season === "all" || currentFilters.season === season) &&
      (currentFilters.edible === "all" || currentFilters.edible === edible) &&
      cardMatchesSearch(card, normalizedQuery);
    card.style.display = show ? "flex" : "none";
    if (show) {
      hasvisibleCards = true;
    }
  }
  const noMatches = document.querySelector(".no-matches");
  if (noMatches) {
    noMatches.hidden = hasvisibleCards;
  }
}
function enableFiltering() {
  seasonFilter.hidden = false;
  edibleFilter.hidden = false;
}
enableFiltering();
