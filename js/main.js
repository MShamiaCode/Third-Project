const navToggle = document.querySelector('[aria-controls="primary-nav"]');
const primaryNav = document.querySelector(".primary-navigation");

navToggle.addEventListener("click", () => {
  const navOpened = navToggle.getAttribute("aria-expanded");

  if (navOpened == "false") {
    navToggle.setAttribute("aria-expanded", "true");
    primaryNav.setAttribute("data-visible", "true");
  } else {
    navToggle.setAttribute("aria-expanded", "false");
    primaryNav.setAttribute("data-visible", "false");
  }
});
