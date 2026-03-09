/**
 * Debajit Das — Personal Portfolio
 * main.js — Core JavaScript
 *
 * Modules:
 *  1. Mobile Sidebar Toggle
 *  2. Active Navigation Link (scroll-spy)
 *  3. Skill Bar Animations (IntersectionObserver)
 *  4. Scroll Reveal Animations (IntersectionObserver)
 *  5. Typewriter Effect (Hero subtitle)
 *  6. Counter Animation (Hero stats)
 *  7. Contact Form Handler
 */

"use strict";

/* ==========================================================================
   1. Mobile Sidebar Toggle
   ========================================================================== */
(function initMobileToggle() {
  const toggle = document.getElementById("mobileToggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");

  if (!toggle || !sidebar) return;

  /**
   * Opens the sidebar on mobile
   */
  function openSidebar() {
    sidebar.classList.add("is-open");
    overlay && overlay.classList.add("is-visible");
    toggle.setAttribute("aria-expanded", "true");
  }

  /**
   * Closes the sidebar on mobile
   */
  function closeSidebar() {
    sidebar.classList.remove("is-open");
    overlay && overlay.classList.remove("is-visible");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    sidebar.classList.contains("is-open") ? closeSidebar() : openSidebar();
  });

  // Close when clicking the overlay backdrop
  overlay && overlay.addEventListener("click", closeSidebar);

  // Close when a nav link is clicked (on mobile)
  sidebar.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", closeSidebar);
  });
})();

/* ==========================================================================
   2. Active Navigation Link (scroll-spy)
   ========================================================================== */
(function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.sidebar__nav a[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  /**
   * Marks the nav link corresponding to the visible section as active
   */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`,
            );
          });
        }
      });
    },
    {
      threshold: 0.35,
      rootMargin: "-10% 0px -55% 0px",
    },
  );

  sections.forEach((section) => observer.observe(section));
})();

/* ==========================================================================
   3. Skill Bar Animations
   ========================================================================== */
(function initSkillBars() {
  const bars = document.querySelectorAll(".skill-bar__fill[data-width]");

  if (!bars.length) return;

  /**
   * Animates skill bars when they enter the viewport
   */
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          // Small delay for visual polish
          setTimeout(() => {
            bar.style.width = bar.dataset.width;
          }, 150);
          obs.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 },
  );

  bars.forEach((bar) => observer.observe(bar));
})();

/* ==========================================================================
   4. Scroll Reveal Animations
   ========================================================================== */
(function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal");

  if (!elements.length) return;

  /**
   * Adds is-visible class to trigger CSS transitions when elements scroll into view
   */
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  elements.forEach((el) => observer.observe(el));
})();

/* ==========================================================================
   5. Typewriter Effect
   ========================================================================== */
(function initTypewriter() {
  const target = document.getElementById("typewriter");

  if (!target) return;

  const roles = [
    "Fullstack Developer",
    "UI/UX Designer",
    "Problem Solver",
    "Web Developer",
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90; // ms per character (typing)
  const deletingSpeed = 55; // ms per character (deleting)
  const pauseAfterType = 2000; // ms pause after full word
  const pauseAfterDelete = 400; // ms pause before next word

  /**
   * Recursively types out and deletes each role string
   */
  function type() {
    const currentRole = roles[roleIndex];
    const displayText = isDeleting
      ? currentRole.substring(0, charIndex - 1)
      : currentRole.substring(0, charIndex + 1);

    target.textContent = displayText;
    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length + 1) {
      // Finished typing — pause then delete
      isDeleting = true;
      delay = pauseAfterType;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting — move to next role
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = pauseAfterDelete;
    }

    setTimeout(type, delay);
  }

  // Kick off with a brief initial delay
  setTimeout(type, 1000);
})();

/* ==========================================================================
   6. Counter Animation
   ========================================================================== */
(function initCounters() {
  const counters = document.querySelectorAll("[data-count]");

  if (!counters.length) return;

  /**
   * Animates a number from 0 to its target value
   * @param {HTMLElement} el - Element containing the count
   * @param {number} target  - The final number to count to
   * @param {string} suffix  - String to append after the number (e.g. '+')
   */
  function animateCounter(el, target, suffix) {
    const duration = 1800; // ms
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(eased * target);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  /**
   * Triggers counters when they enter the viewport
   */
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || "";
          animateCounter(el, target, suffix);
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => observer.observe(counter));
})();

/* ==========================================================================
   7. Contact Form Handler
   ========================================================================== */
(function initContactForm() {
  const form = document.getElementById("contactForm");

  if (!form) return;

  /**
   * Handles form submission with basic validation and user feedback.
   * In production, replace the simulated send with a real API call
   * (e.g., EmailJS, Formspree, or a backend endpoint).
   */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('[type="submit"]');
    const name = form.querySelector("#name").value.trim();
    const email = form.querySelector("#email").value.trim();
    const message = form.querySelector("#message").value.trim();

    // Simple validation
    if (!name || !email || !message) {
      showFormMessage(form, "Please fill in all required fields.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showFormMessage(form, "Please enter a valid email address.", "error");
      return;
    }

    // Loading state
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Simulate async send (replace with real API call)
    setTimeout(() => {
      showFormMessage(
        form,
        "✓ Message sent! I'll get back to you soon.",
        "success",
      );
      form.reset();
      submitBtn.textContent = "Send Message";
      submitBtn.disabled = false;
    }, 1500);
  });

  /**
   * Validates an email address format
   * @param {string} email
   * @returns {boolean}
   */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * Displays a success or error message in the form
   * @param {HTMLFormElement} form
   * @param {string}          message
   * @param {'success'|'error'} type
   */
  function showFormMessage(form, message, type) {
    // Remove any existing message
    const existing = form.querySelector(".form-message");
    if (existing) existing.remove();

    const el = document.createElement("p");
    el.className = `form-message form-message--${type}`;
    el.textContent = message;
    el.style.cssText = `
      font-size: 0.78rem;
      padding: 0.75rem 1rem;
      border-radius: 2px;
      margin-top: 0.5rem;
      border: 1px solid ${type === "success" ? "#f0a500" : "#e05252"};
      color: ${type === "success" ? "#f0a500" : "#e05252"};
      background: ${type === "success" ? "rgba(240,165,0,0.06)" : "rgba(224,82,82,0.06)"};
    `;

    form.appendChild(el);

    // Auto-remove after 5 seconds
    setTimeout(() => el.remove(), 5000);
  }
})();
