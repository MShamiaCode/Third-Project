const cards = document.querySelectorAll(".mushroom-guide .card");
const seasonFilter = document.querySelector("#season");
const edibleFilter = document.querySelector("#edible");

const currentFilters = {
  season: "all",
  edible: "all",
};

cards.forEach((card, index) => {
  const mushroomId = `mushroom-${index + 1}`;
  card.style.viewTransitionName = `card-${mushroomId}`;
});

seasonFilter.addEventListener("change", function () {
  currentFilters.season = this.value;
  if (!document.startViewTransition()) {
    filterCards();
    return;
  }
  document.startViewTransition(() => {
    filterCards();
  });
});
edibleFilter.addEventListener("change", function () {
  currentFilters.edible = this.value;
  if (!document.startViewTransition()) {
    filterCards();
    return;
  }
  document.startViewTransition(() => {
    filterCards();
  });
});

function filterCards() {
  let hasvisibleCards = false;
  cards.forEach(function (card) {
    const season = card.querySelector("[data-season]").dataset.season;
    const edible = card.querySelector("[data-edible]").dataset.edible;
    const show =
      (currentFilters.season === "all" || currentFilters.season === season) &&
      (currentFilters.edible === "all" || currentFilters.edible === edible);
    card.style.display = show ? "flex" : "none";
    if (show) {
      hasvisibleCards = true;
    }
  });
  const noMatches = document.querySelector(".no-matches");
  noMatches.style.display = hasvisibleCards ? "none" : "block";
}
function enableFiltering() {
  seasonFilter.hidden = false;
  edibleFilter.hidden = false;
}
enableFiltering();
