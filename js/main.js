const navToggle = document.querySelector('[aria-controls="primary-nav"]');
const primaryNav = document.querySelector(".primary-navigation");

function closeNav() {
  navToggle.setAttribute("aria-expanded", "false");
  primaryNav.setAttribute("data-visible", "false");
}

function openNav() {
  navToggle.setAttribute("aria-expanded", "true");
  primaryNav.setAttribute("data-visible", "true");
}

navToggle.addEventListener("click", () => {
  const navOpened = navToggle.getAttribute("aria-expanded");

  if (navOpened === "false") {
    openNav();
  } else {
    closeNav();
  }
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    navToggle.getAttribute("aria-expanded") === "true"
  ) {
    closeNav();
    navToggle.focus();
  }
});

const desktopNavQuery = window.matchMedia("(min-width: 760px)");
function closeNavWhenDesktop() {
  if (desktopNavQuery.matches) {
    closeNav();
  }
}
desktopNavQuery.addEventListener("change", closeNavWhenDesktop);

const resizeObserver = new ResizeObserver((entries) => {
  document.body.classList.add("resizing");
  requestAnimationFrame(() => {
    document.body.classList.remove("resizing");
  });
});
resizeObserver.observe(document.body);
