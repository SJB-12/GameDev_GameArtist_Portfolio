const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");
const topbar = document.querySelector(".topbar");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const pageLoader = document.querySelector(".page-loader");
const loaderAnimation = document.querySelector("#loader-animation");
const loaderAnimationData = document.querySelector("#loader-animation-data");
const minimumLoadingTime = 3000;
const loadingStartedAt = performance.now();

if (window.lottie && loaderAnimation && loaderAnimationData) {
  window.lottie.loadAnimation({
    container: loaderAnimation,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: JSON.parse(loaderAnimationData.textContent)
  });
}

window.addEventListener("load", () => {
  const remainingTime = Math.max(0, minimumLoadingTime - (performance.now() - loadingStartedAt));

  window.setTimeout(() => {
    pageLoader?.classList.add("is-hidden");
    document.body.classList.remove("is-loading");
  }, remainingTime);
});

function clearActive() {
  navLinks.forEach(link => link.classList.remove("active"));
}

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
        clearActive();
        const id = entry.target.id;
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) link.classList.add("active");
      }
    });
  },
  {
    threshold: [0.3, 0.45, 0.6],
    rootMargin: "-5% 0px -45% 0px"
  }
);

sections.forEach(section => observer.observe(section));

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    clearActive();
    link.classList.add("active");

    if (window.innerWidth <= 768 && topbar) {
      topbar.classList.remove("is-open");
      if (mobileMenuToggle) mobileMenuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

if (mobileMenuToggle && topbar) {
  mobileMenuToggle.addEventListener("click", () => {
    const isOpen = topbar.classList.toggle("is-open");
    mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}
