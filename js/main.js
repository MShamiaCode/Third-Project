const navToggle = document.querySelector('[aria-controls="primary-nav"]');
const primaryNav = document.querySelector(".primary-navigation");

navToggle.addEventListener("click", () => {
  const navOpened = navToggle.getAttribute("area-expanded");

  if (navOpened === "false") {
    navToggle.setAttribute("area-expanded", "true");
    primaryNav.setAttribute("data-visible", "true");
  } else {
    navToggle.setAttribute("area-expanded", "false");
    primaryNav.setAttribute("data-visible", "false");
  }
});

const resizeObserver = new ResizeObserver((entries) => {
  document.body.classList.add("resizing");
  requestAnimationFrame(() => {
    document.body.classList.remove("resizing");
  });
});
resizeObserver.observe(document.body);
