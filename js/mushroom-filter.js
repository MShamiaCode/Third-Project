const cards = document.querySelectorAll(".mushroom-guide .grid-auto-fill > .card");
const seasonFilter = document.querySelector("#season");
const edibleFilter = document.querySelector("#edible");
const searchInput = document.querySelector("#mushroom-search");

const currentFilters = {
  season: "all",
  edible: "all",
  search: "",
};

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
  runWithViewTransition(filterCards);
});

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
  cards.forEach(function (card) {
    const season = card.querySelector("[data-season]").dataset.season;
    const edible = card.querySelector("[data-edible]").dataset.edible;
    const show =
      (currentFilters.season === "all" || currentFilters.season === season) &&
      (currentFilters.edible === "all" || currentFilters.edible === edible) &&
      cardMatchesSearch(card, normalizedQuery);
    card.style.display = show ? "flex" : "none";
    if (show) {
      hasvisibleCards = true;
    }
  });
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
