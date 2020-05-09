const sec = Array.from(document.getElementsByTagName("section"));
const title = document.getElementById("title");
const nl = document.getElementById("navbar__list");

/**
 * jQuery Scroll to element
 */
function scrollTo(target) {
  $("html,body").animate(
    {
      scrollTop: target ? target.offset().top : 0,
    },
    "slow"
  );
}

/**
 * Function called on each scroll event.
 * It checks for the elements in viewport and sets active classes accordingly.
 */
function focusOnScroll() {
  sec.forEach((section) => section.classList.remove("section-active"));
  if (isElementInViewport(title)) {
    nl.childNodes[0].classList.add("navbar-active");
    nl.childNodes.forEach(
      (navLink, index) => index && navLink.classList.remove("navbar-active")
    );
  } else {
    const activeIndex = sec.findIndex((section) =>
      isElementInViewport(section.childNodes[1].childNodes[1])
    );
    const activeSection = sec[activeIndex];
    const activeLink = nl.childNodes[activeIndex + 1];
    activeSection && activeSection.classList.add("section-active");
    activeLink && activeLink.classList.add("navbar-active");
    nl.childNodes.forEach(
      (navLink, index) =>
        index !== activeIndex + 1 && navLink.classList.remove("navbar-active")
    );
  }
}

window.onscroll = focusOnScroll;

/**
 * Checks if the element is inside the viewport.
 */
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Populates the navbar list items with the section data.
 */
function renderNavbar() {
  const homeLink = document.createElement("li");
  homeLink.innerText = "Home";
  homeLink.className = "menu__link";
  homeLink.onclick = () => scrollTo();
  nl.appendChild(homeLink);
  sec.forEach((section) => {
    if (!section.dataset || !section.dataset.nav) return;
    const item = document.createElement("li");
    item.innerText = section.dataset.nav;
    item.className = "menu__link";
    item.onclick = () => scrollTo($(`#${section.id}`));
    nl.appendChild(item);
  });
}

renderNavbar();
focusOnScroll();
