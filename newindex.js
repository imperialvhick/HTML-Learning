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
document
  .querySelectorAll(".stat-card, .service-card, .pain-card, .step, .aboutstep")
  .forEach((el) => {
    scrollObserver.observe(el);
  });

// Initialize Lucide icons
lucide.createIcons();

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

const track = document.getElementById("carouselTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("dotsContainer");
const cards = document.querySelectorAll(".testimonial-card");

let currentIndex = 0;
let cardsPerView = 3;
let autoScrollInterval;

// Determine cards per view based on screen size
function updateCardsPerView() {
  if (window.innerWidth <= 768) {
    cardsPerView = 1;
  } else if (window.innerWidth <= 1024) {
    cardsPerView = 2;
  } else {
    cardsPerView = 3;
  }
}

// Create dots
function createDots() {
  dotsContainer.innerHTML = "";
  const totalSlides = Math.ceil(cards.length / cardsPerView);
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

// Update carousel position
function updateCarousel() {
  const cardWidth = cards[0].offsetWidth;
  const gap = 32; // 2rem in pixels
  const offset = -(currentIndex * cardsPerView * (cardWidth + gap));
  track.style.transform = `translateX(${offset}px)`;

  // Update dots
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

// Go to specific slide
function goToSlide(index) {
  const totalSlides = Math.ceil(cards.length / cardsPerView);
  currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
  updateCarousel();
  resetAutoScroll();
}

// Next slide
function nextSlide() {
  const totalSlides = Math.ceil(cards.length / cardsPerView);
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}

// Previous slide
function prevSlide() {
  const totalSlides = Math.ceil(cards.length / cardsPerView);
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

// Auto scroll
function startAutoScroll() {
  autoScrollInterval = setInterval(nextSlide, 5000);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

function resetAutoScroll() {
  stopAutoScroll();
  startAutoScroll();
}

// Event listeners
nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoScroll();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoScroll();
});

// Pause on hover
track.addEventListener("mouseenter", stopAutoScroll);
track.addEventListener("mouseleave", startAutoScroll);

// Handle resize
window.addEventListener("resize", () => {
  updateCardsPerView();
  createDots();
  currentIndex = 0;
  updateCarousel();
});

// Initialize
updateCardsPerView();
createDots();
updateCarousel();
startAutoScroll();

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navLinks = document.getElementById("navLinks");
const mobileOverlay = document.getElementById("mobileOverlay");
const menuItems = navLinks.querySelectorAll("a");

function toggleMobileMenu() {
  mobileMenuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
  mobileOverlay.classList.toggle("active");
  // Prevent body scroll when menu is open
  document.body.style.overflow = navLinks.classList.contains("active")
    ? "hidden"
    : "";
}

// Toggle menu on hamburger click
mobileMenuToggle.addEventListener("click", toggleMobileMenu);

// Close menu when clicking overlay
mobileOverlay.addEventListener("click", toggleMobileMenu);

// Close menu when clicking on a link
menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      toggleMobileMenu();
    }
  });
});

// Close menu on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("active")) {
    toggleMobileMenu();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // 1. Get the current URL path (e.g., "/about/")
  // We use .replace(/\/$/, "") to remove trailing slashes for better matching
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";

  // 2. Grab all your navigation links
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    // 3. Get the link's destination path
    const linkPath = link.getAttribute("href").replace(/\/$/, "") || "/";

    // 4. Compare and add the 'active' class
    if (currentPath === linkPath) {
      link.classList.add("active");
    }
  });
});
