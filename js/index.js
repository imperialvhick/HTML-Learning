// 1. Navigation Scroll Effect
window.addEventListener("scroll", function () {
  const nav = document.querySelector(".nav");
  if (nav) {
    // Safety check to prevent errors if .nav doesn't exist
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }
});

// 2. Setup Observer Options
const generalOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

// 3. Define the Animation Logic
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Check if the element entering the screen is a stat counter
      const counter = entry.target.querySelector("[data-target]");
      if (counter && !counter.classList.contains("counted")) {
        animateCounter(counter);
        counter.classList.add("counted");
      }
    }
  });
}, generalOptions);

// 4. Start Observing Elements
document.querySelectorAll(".stat-card, .service-card").forEach((el) => {
  scrollObserver.observe(el);

  lucide.createIcons();
});

// 5. Counter Animation Function
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}
