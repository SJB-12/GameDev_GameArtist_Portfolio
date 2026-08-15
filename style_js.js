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
        <!-- PROJECTS HERO -->
        <div class="projects-hero">
          <h2 class="projects-hero-title">Projects</h2>
        </div>

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

        <!-- PROJECT 3 -->
        <article class="project-card">
          <div class="project-video-container">
            <video class="project-video" autoplay muted loop playsinline>
              <source src="Videos/CricinshotsProject0200-0400.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>

          <h3>Cricinshots Game Assets</h3>
          <div class="project-tools">
            <span class="tool-tag">Unity</span>
            <span class="tool-tag">Blender</span>
          
          </div>

          <p>
  Created 200+ optimized 3D assets for the Cricinshots cricket game, including props,
  environment pieces, and gameplay elements. Ensured all models were optimized for mobile
  performance, matched the art style, and integrated cleanly into Unity.
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

        <!-- ART PROJECT 2 -->
        <article class="project-card">
          <div class="project-image-container">
            <img src="artPortfolioFiles/wall-e 1.png" alt="Wall-E Fan Art 3D Model" class="project-image">
          </div>
          <h3>Wall-E 3D Model & Render</h3>
          <div class="project-tools">
            <span class="tool-tag">Blender</span>
            <span class="tool-tag">Substance Painter</span>
          </div>
          <p>
            Detailed hard-surface modeling and texturing study of Wall-E, featuring weathered materials and accurate mechanical proportions.
          </p>
        </article>

        <!-- ART PROJECT 3 -->
        <article class="project-card">
          <div class="project-image-container">
            <img src="artPortfolioFiles/ayodhyabanner.png" alt="Ayodhya Environment Art" class="project-image">
          </div>
          <h3>Ayodhya Environment Design</h3>
          <div class="project-tools">
            <span class="tool-tag">Blender</span>
            <span class="tool-tag">Unity</span>
          </div>
          <p>
            Majestic cultural environment concept and modular architectural asset designs, optimized for real-time rendering.
          </p>
        </article>

        <!-- ART PROJECT 4 -->
        <article class="project-card">
          <div class="project-image-container">
            <img src="artPortfolioFiles/robo rendered 1.png" alt="Sci-Fi Robot Render" class="project-image">
          </div>
          <h3>Sci-Fi Mecha Robot</h3>
          <div class="project-tools">
            <span class="tool-tag">Blender</span>
            <span class="tool-tag">Texturing</span>
          </div>
          <p>
            Hard surface sci-fi robot concept rendered with atmospheric lighting and detailed paneling textures.
          </p>
        </article>

        <!-- ART PROJECT 5 -->
        <article class="project-card">
          <div class="project-image-container">
            <img src="artPortfolioFiles/black hole 3.png" alt="Black Hole Visual Effect" class="project-image">
          </div>
          <h3>Black Hole VFX Art</h3>
          <div class="project-tools">
            <span class="tool-tag">Blender</span>
            <span class="tool-tag">Shaders</span>
          </div>
          <p>
            Space-themed cosmic visual art study focusing on gravitational lensing effects and glowing accretion disks.
          </p>
        </article>

        <!-- ART PROJECT 6 -->
        <article class="project-card">
          <div class="project-image-container">
            <img src="artPortfolioFiles/gaming room 1.png" alt="Gaming Room Interior" class="project-image">
          </div>
          <h3>Stylized Gaming Room Interior</h3>
          <div class="project-tools">
            <span class="tool-tag">Blender</span>
            <span class="tool-tag">Interior Design</span>
          </div>
          <p>
            Cozy, highly detailed stylized interior environment featuring custom props, neon lighting, and gamer aesthetics.
          </p>
        </article>
`;

if (modeToggle && projectsGrid) {
  modeToggle.addEventListener("change", () => {
    const isArtist = modeToggle.checked;
    
    toggleLogos.forEach(lbl => {
      if (lbl.getAttribute("data-view") === "gameartist") {
        lbl.classList.toggle("active", isArtist);
      } else {
        lbl.classList.toggle("active", !isArtist);
      }
    });

    if (isArtist) {
      projectsGrid.innerHTML = gameArtistProjectsHTML;
    } else {
      projectsGrid.innerHTML = gameDevProjectsHTML;
    }
  });

  toggleLogos.forEach(lbl => {
    lbl.addEventListener("click", () => {
      const view = lbl.getAttribute("data-view");
      if (view === "gameartist") {
        modeToggle.checked = true;
      } else {
        modeToggle.checked = false;
      }
      modeToggle.dispatchEvent(new Event("change"));
    });
  });
}
