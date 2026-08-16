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

// Animate the About profile frame + stats tiles whenever they enter the viewport
const aboutAside = document.querySelector(".about-aside");
if (aboutAside) {
  const aboutObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          aboutAside.classList.add("in-view");
        } else {
          aboutAside.classList.remove("in-view");
        }
      });
    },
    { threshold: 0.3 }
  );
  aboutObserver.observe(aboutAside);
}

if (mobileMenuToggle && topbar) {
  mobileMenuToggle.addEventListener("click", () => {
    const isOpen = topbar.classList.toggle("is-open");
    mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Portfolio Mode Toggle (Game Dev vs Game Artist)
const modeToggle = document.getElementById("portfolio-mode-toggle");
const toggleLogos = document.querySelectorAll(".toggle-logo");
const projectsGrid = document.getElementById("projects-grid-container");

const gameDevProjectsHTML = `
        <!-- PROJECTS HEADING -->
        <h2 class="projects-heading">Projects</h2>

        <!-- PROJECT 1 -->
        <article class="project-card">
          <div class="project-video-container">
            <video class="project-video" autoplay muted loop playsinline>
              <source src="Videos/subkoVideo.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>

          <h3>Subko Forest VR Environment</h3>
          <div class="project-tools">
            <span class="tool-tag">Unity</span>
            <span class="tool-tag">Meta VR SDK</span>
            <span class="tool-tag">C#</span>
          </div>

          <p>
            A stylized VR forest environment built with immersive lighting, interactable props, 
            and smooth VR movement mechanics. Designed to run optimally on Meta Quest hardware 
            while maintaining a polished, atmospheric feel.
          </p>
        </article>

        <!-- PROJECT 2 -->
        <article class="project-card">
          <div class="project-image-container">
  <img src="Images\\project2.png" alt="VR Interaction Preview" class="project-image">
</div>


          <h3>WCPL Game Tester Using Scene Detection & YOLO (Prototype)</h3>
          <div class="project-tools">
            <span class="tool-tag">Python</span>
            <span class="tool-tag">YOLO</span>
          </div>

          <p>
  A prototype that uses YOLO-based scene detection to automatically test the WCPL cricket game.
  It reads game visuals, detects ball timing, and performs swiping actions to hit shots at the
  perfect moment, automating repetitive gameplay testing.
</p>

        </article>



        <!-- PROJECT 4 - ADD YOUR CONTENT HERE -->
        <article class="project-card">
          <div class="project-video-container">
            <video class="project-video" autoplay muted loop playsinline>
              <source src="Videos/CarMechanics.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>

          <h3>Car Mechanics Prototype</h3>
          <div class="project-tools">
            <span class="tool-tag">Unity</span>
            <span class="tool-tag">C#</span>
          </div>

          <p>
            A Unity-based car controller prototype featuring smooth acceleration, responsive turning, and natural drifting behavior. The system uses tuned wheel-collider physics, handbrake-activated drifts, and speed-based steering to make driving feel dynamic and fun while still grounded and controllable.
          </p>
        </article>

        <!-- PROJECT 5 - ZOMBIE RUNNER -->
<article class="project-card">
  <div class="project-video-container">
    <video class="project-video" autoplay muted loop playsinline>
      <source src="Videos/project5.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>

  <h3>Zombie Runner</h3>
  <div class="project-tools">
    <span class="tool-tag">Unity</span>
    <span class="tool-tag">C#</span>
    <span class="tool-tag">Mobile</span>
  </div>

  <p>
    A mobile endless runner shooter prototype focused on gameplay systems and mobile input handling.
    Built an endless terrain setup, raycast-based gun shooting with ammo and reload logic, and
    joystick-driven left/right movement combined with touch-based camera rotation. The project helped
    me understand mobile UI flows, input edge cases, and clean separation of gameplay systems.
  </p>
</article>

        <!-- PROJECT 5 - GRID FIT -->
<article class="project-card">
  <div class="project-video-container">
    <video class="project-video" autoplay muted loop playsinline>
      <source src="Videos\\Project6.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>

  <h3>Fit Grid</h3>
  <div class="project-tools">
    <span class="tool-tag">Unity</span>
    <span class="tool-tag">C#</span>
    <span class="tool-tag">Mobile</span>
  </div>

  <p>
    A mobile arcade-style reflex game built around swipe-based movement and procedurally generated grid patterns with a single valid path. 
    Implemented dynamic grid logic, boundary-clamped controls, collision-based game-over handling, and a minimal mobile-first UI. 
    Designed for portrait orientation with progressive difficulty scaling.
  </p>
</article>
`;

const gameArtistProjectsHTML = `
        <!-- PROJECTS HERO -->
        <div class="projects-hero">
          <div class="projects-hero-wave-bg"></div>
          <h2 class="projects-hero-title">Projects</h2>
        </div>

        <!-- ART SHOWCASE 1: CRICKET CLASH -->
        <div class="artist-showcase">
          <div class="artist-showcase-bg">
            <img src="artPortfolioFiles/wcpl banner.png" alt="Cricket Clash Banner Art">
          </div>

          <div class="artist-showcase-inner">
            <div class="artist-showcase-text">
              <h2 class="artist-showcase-title">Cricket Clash</h2>
              <p class="artist-showcase-subtitle">Wega Labs</p>
            </div>

            <div class="artist-showcase-right">
              <h3 class="artist-showcase-heading">Environments</h3>
              <div class="artist-showcase-cards">
                <div class="artist-card">
                  <img src="artPortfolioFiles/env1.png" alt="Environment 1">
                </div>
                <div class="artist-card">
                  <img src="artPortfolioFiles/env2.png" alt="Environment 2">
                </div>
                <div class="artist-card">
                  <img src="artPortfolioFiles/env3.png" alt="Environment 3">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ART SHOWCASE 2: CHARACTERS -->
        <div class="artist-showcase">
          <div class="artist-showcase-bg">
            <img src="artPortfolioFiles/wcpl banner.png" alt="Characters Banner Art">
          </div>

          <div class="artist-showcase-inner">
            <div class="artist-showcase-text">
              <h2 class="artist-showcase-title">Cricket Clash</h2>
              <p class="artist-showcase-subtitle">Wega Labs</p>
            </div>

            <div class="artist-showcase-right">
              <h3 class="artist-showcase-heading">Character Showcase</h3>
              <div class="char-carousel" id="char-carousel">
                <div class="char-card"><img src="artPortfolioFiles/Characters/char1.png" alt="Character 1"></div>
                <div class="char-card"><img src="artPortfolioFiles/Characters/char2.png" alt="Character 2"></div>
                <div class="char-card"><img src="artPortfolioFiles/Characters/char3.png" alt="Character 3"></div>
                <div class="char-card"><img src="artPortfolioFiles/Characters/char4.png" alt="Character 4"></div>
                <div class="char-card"><img src="artPortfolioFiles/Characters/char5.png" alt="Character 5"></div>
                <div class="char-card"><img src="artPortfolioFiles/Characters/char6.png" alt="Character 6"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- ART SHOWCASE 3: TOOLS & ICONS -->
        <div class="artist-showcase">
          <div class="artist-showcase-bg artist-showcase-bg--dim">
            <img src="artPortfolioFiles/wcpl banner.png" alt="Tools Banner Art">
          </div>

          <div class="artist-showcase-inner">
            <div class="artist-showcase-text">
              <h2 class="artist-showcase-title">Cricket Clash</h2>
              <p class="artist-showcase-subtitle">Wega Labs</p>
            </div>

            <div class="artist-showcase-right">
              <h3 class="artist-showcase-heading">Icon Pack</h3>
              <div class="tools-grid">
                <div class="tool-icon-card">
                  <img src="artPortfolioFiles/icons/batchicon.png" alt="Batch Icon">
                </div>
                <div class="tool-icon-card">
                  <img src="artPortfolioFiles/icons/Campaign edited 2.png" alt="Campaign Icon">
                </div>
                <div class="tool-icon-card">
                  <img src="artPortfolioFiles/icons/CUT_Coins 5.png" alt="Coins Icon">
                </div>
                <div class="tool-icon-card">
                  <img src="artPortfolioFiles/icons/E3.png" alt="E3 Icon">
                </div>
                <div class="tool-icon-card">
                  <img src="artPortfolioFiles/icons/shop new 2 edited 1.png" alt="Shop Icon">
                </div>
                <div class="tool-icon-card">
                  <img src="artPortfolioFiles/icons/stadIcon.png" alt="Stadium Icon">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ART SHOWCASE 4: STADIUM -->
        <div class="artist-showcase">
          <div class="artist-showcase-bg">
            <img src="artPortfolioFiles/wcpl banner.png" alt="Stadium Banner Art">
          </div>

          <div class="artist-showcase-inner">
            <div class="artist-showcase-text">
              <h2 class="artist-showcase-title">Cricket Clash</h2>
              <p class="artist-showcase-subtitle">Wega Labs</p>
            </div>

            <div class="artist-showcase-right">
              <h3 class="artist-showcase-heading">Stadium</h3>
              <div class="stadium-grid">
                <div class="stadium-card">
                  <img src="artPortfolioFiles/Stadium/sta1.png" alt="Stadium 1">
                </div>
                <div class="stadium-card">
                  <img src="artPortfolioFiles/Stadium/sta2.png" alt="Stadium 2">
                </div>
                <div class="stadium-card">
                  <img src="artPortfolioFiles/Stadium/sta3.png" alt="Stadium 3">
                </div>
                <div class="stadium-card">
                  <img src="artPortfolioFiles/Stadium/sta4.png" alt="Stadium 4">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ART SHOWCASE 5: PERSONAL PROJECTS -->
        <div class="artist-showcase">
          <div class="artist-showcase-bg">
            <img src="artPortfolioFiles/PersonalProjects/black hole 3.png" alt="Personal Projects Banner Art">
          </div>

          <div class="artist-showcase-inner">
            <div class="artist-showcase-text">
              <h2 class="artist-showcase-title">Personal Projects</h2>
              <p class="artist-showcase-subtitle">My Artwork</p>
            </div>

            <div class="artist-showcase-right">
              <h3 class="artist-showcase-heading">Art Gallery</h3>
              <div class="personal-carousel" id="personal-carousel">
                <div class="personal-card"><img src="artPortfolioFiles/PersonalProjects/avengers 1.png" alt="Avengers"></div>
                <div class="personal-card"><img src="artPortfolioFiles/PersonalProjects/cup 1.png" alt="Cup"></div>
                <div class="personal-card"><img src="artPortfolioFiles/PersonalProjects/gaming room 1.png" alt="Gaming Room"></div>
                <div class="personal-card"><img src="artPortfolioFiles/PersonalProjects/robo rendered 1.png" alt="Robo Render"></div>
                <div class="personal-card"><img src="artPortfolioFiles/PersonalProjects/teleport 1.png" alt="Teleport"></div>
                <div class="personal-card"><img src="artPortfolioFiles/PersonalProjects/untitled 1.png" alt="Untitled"></div>
                <div class="personal-card"><img src="artPortfolioFiles/PersonalProjects/vuluan 1.png" alt="Vuluan"></div>
                <div class="personal-card"><img src="artPortfolioFiles/PersonalProjects/wall-e 1.png" alt="Wall-E"></div>
              </div>
            </div>
          </div>
        </div>
`;

let charCarouselTimer = null;
let personalCarouselTimer = null;

function clearCarouselTimers() {
  if (charCarouselTimer) {
    clearTimeout(charCarouselTimer);
    charCarouselTimer = null;
  }
  if (personalCarouselTimer) {
    clearTimeout(personalCarouselTimer);
    personalCarouselTimer = null;
  }
}

// Character carousel: cards cycle so the center card enlarges, then shrinks as the next one takes its place
function initCharCarousel() {
  const carousel = document.getElementById("char-carousel");
  if (!carousel) return;

  const cards = Array.from(carousel.children);
  const total = cards.length;
  let centerIndex = 0;

  const layout = () => {
    const carouselWidth = carousel.offsetWidth || 800;
    const isMobile = window.innerWidth <= 768;
    // Calculate card translation steps dynamically based on container width
    const stepX = isMobile ? carouselWidth * 0.28 : Math.min(240, carouselWidth * 0.28);

    cards.forEach((card, i) => {
      let rel = (i - centerIndex) % total;
      if (rel > 3) rel -= total;
      if (rel < -3) rel += total;

      let x, scale, z, opacity;
      switch (rel) {
        case 0:
          x = 0; scale = 1.35; z = 10; opacity = 1;
          break;
        case 1:
          x = stepX; scale = 1; z = 6; opacity = 1;
          break;
        case -1:
          x = -stepX; scale = 1; z = 6; opacity = 1;
          break;
        case 2:
          x = stepX * 1.95; scale = 0.72; z = 3; opacity = 0.55;
          break;
        case -2:
          x = -stepX * 1.95; scale = 0.72; z = 3; opacity = 0.55;
          break;
        default:
          x = 0; scale = 0.45; z = 1; opacity = 0.25;
          break;
      }

      card.style.zIndex = z;
      card.style.opacity = opacity;
      card.style.transform = `translate(${x}px, 0) scale(${scale})`;
      card.style.boxShadow = rel === 0 ? "0 30px 70px rgba(0,0,0,0.7), 0 0 30px rgba(77,184,255,0.3)" : "0 20px 50px rgba(0,0,0,0.55)";
    });
  };

  const step = () => {
    centerIndex = (centerIndex + 1) % total;
    layout();
    charCarouselTimer = setTimeout(step, 2400);
  };

  // Run layout function on window resize as well for instant responsiveness
  const resizeHandler = () => {
    if (document.getElementById("char-carousel")) {
      layout();
    }
  };
  window.addEventListener("resize", resizeHandler);

  layout();
  charCarouselTimer = setTimeout(step, 2400);
}

// Personal carousel: shows one large card at a time, cycling through them
function initPersonalCarousel() {
  const carousel = document.getElementById("personal-carousel");
  if (!carousel) return;

  const cards = Array.from(carousel.children);
  const total = cards.length;
  let index = 0;

  const show = i => {
    cards.forEach((card, idx) => {
      card.classList.toggle("current", idx === i);
    });
  };

  const step = () => {
    index = (index + 1) % total;
    show(index);
    personalCarouselTimer = setTimeout(step, 3000);
  };

  show(0);
  personalCarouselTimer = setTimeout(step, 3000);
}

// Animate artist showcase subsections whenever they enter the viewport
const showcaseObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view");
      }
    });
  },
  { threshold: 0.35 }
);

function observeShowcases() {
  document.querySelectorAll(".artist-showcase, .projects-hero").forEach(el => showcaseObserver.observe(el));
}

// Game Dev project cards: fall in from the front as they scroll into view
const cardObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        cardObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

function observeProjectCards() {
  const cards = document.querySelectorAll("#projects-grid-container .project-card");
  cards.forEach((card, i) => {
    card.style.setProperty("--delay", `${i * 0.12}s`);
    if (!card.classList.contains("observed")) {
      card.classList.add("observed");
      cardObserver.observe(card);
    }
  });
}

if (modeToggle && projectsGrid) {
  const syncPortfolioView = () => {
    const isArtist = modeToggle.checked;
    
    // Toggle class on body to let CSS apply view-specific overrides
    document.body.classList.toggle("artist-mode", isArtist);
    
    toggleLogos.forEach(lbl => {
      if (lbl.getAttribute("data-view") === "gameartist") {
        lbl.classList.toggle("active", isArtist);
      } else {
        lbl.classList.toggle("active", !isArtist);
      }
    });

    clearCarouselTimers();

    if (isArtist) {
      projectsGrid.innerHTML = gameArtistProjectsHTML;
      initCharCarousel();
      initPersonalCarousel();
      observeShowcases();
    } else {
      projectsGrid.innerHTML = gameDevProjectsHTML;
      observeProjectCards();
    }
  };

  modeToggle.addEventListener("change", syncPortfolioView);

  toggleLogos.forEach(lbl => {
    lbl.addEventListener("click", () => {
      const view = lbl.getAttribute("data-view");
      modeToggle.checked = (view === "gameartist");
      modeToggle.dispatchEvent(new Event("change"));
    });
  });

  // Sync state on load (in case of page refresh retaining state)
  syncPortfolioView();
}

// Skills magnet hover: only the neighbouring boxes grow a little
const skillBoxes = document.querySelectorAll(".skill-box");
const SKILLS_PER_ROW = 5;
const clearNear = (i) => {
  [-1, 1, -SKILLS_PER_ROW, SKILLS_PER_ROW].forEach(offset => {
    const idx = i + offset;
    if (idx >= 0 && idx < skillBoxes.length) skillBoxes[idx].classList.remove("near");
  });
};

skillBoxes.forEach((box, i) => {
  box.addEventListener("mouseenter", () => {
    [-1, 1, -SKILLS_PER_ROW, SKILLS_PER_ROW].forEach(offset => {
      const idx = i + offset;
      if (idx >= 0 && idx < skillBoxes.length) skillBoxes[idx].classList.add("near");
    });
  });
  box.addEventListener("mouseleave", () => clearNear(i));
});
