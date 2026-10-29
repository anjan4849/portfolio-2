/**
 * ====================================================================
 * MAIN APPLICATION LOGIC — ANJAN TRIPATHI PORTFOLIO
 * ====================================================================
 * Handles:
 * - Dynamic rendering of projects, skills, and milestones from portfolio-data.js
 * - Navigation scroll spy, sticky header, and mobile menu drawer
 * - Interactive modals (Project Deep Dive, Resume Viewer)
 * - Accent theme switcher (Emerald, Cyan, Indigo, Amber) with persistence
 * - Contact form validation & simulated submission feedback
 * - Copy-to-clipboard toast notification
 * - Back-to-top button & accessibility keyboard trap/escape handlers
 */

document.addEventListener("DOMContentLoaded", () => {
  const data = window.PORTFOLIO_DATA || {};

  // Initialize all features
  initThemeAccent();
  initNavigation();
  initSkillsFilter(data.skills);
  initProjects(data.projects);
  initModals(data);
  initContactForm(data.profile);
  initCopyEmail(data.profile);
  initBackToTop();
  initScrollReveal();

  console.log("%c Anjan Tripathi Portfolio Initialized 🚀", "color: #10b981; font-weight: bold; font-size: 14px;");
  console.log("%c Tech: Python & CSS Enthusiast • Newton School of Technology", "color: #38bdf8; font-size: 12px;");
});

/* ====================================================================
 * 1. THEME ACCENT SWITCHER
 * ==================================================================== */
function initThemeAccent() {
  const accents = {
    emerald: {
      primary: "#10b981",
      primaryLight: "#34d399",
      primaryGlow: "rgba(16, 185, 129, 0.25)",
      borderGlow: "rgba(16, 185, 129, 0.4)"
    },
    cyan: {
      primary: "#06b6d4",
      primaryLight: "#38bdf8",
      primaryGlow: "rgba(6, 182, 212, 0.25)",
      borderGlow: "rgba(6, 182, 212, 0.4)"
    },
    indigo: {
      primary: "#6366f1",
      primaryLight: "#818cf8",
      primaryGlow: "rgba(99, 102, 241, 0.25)",
      borderGlow: "rgba(99, 102, 241, 0.4)"
    },
    amber: {
      primary: "#f59e0b",
      primaryLight: "#fbbf24",
      primaryGlow: "rgba(245, 158, 11, 0.25)",
      borderGlow: "rgba(245, 158, 11, 0.4)"
    }
  };

  const themeBtn = document.getElementById("theme-toggle-btn");
  const themeMenu = document.getElementById("theme-dropdown");
  const accentButtons = document.querySelectorAll(".theme-option");
  const root = document.documentElement;

  function applyAccent(accentName) {
    const theme = accents[accentName] || accents.emerald;
    root.style.setProperty("--accent", theme.primary);
    root.style.setProperty("--accent-light", theme.primaryLight);
    root.style.setProperty("--accent-glow", theme.primaryGlow);
    root.style.setProperty("--border-glow", theme.borderGlow);

    accentButtons.forEach((btn) => {
      const isSelected = btn.getAttribute("data-accent") === accentName;
      btn.classList.toggle("active", isSelected);
      btn.setAttribute("aria-selected", isSelected ? "true" : "false");
    });

    localStorage.setItem("anjan_portfolio_accent", accentName);
  }

  // Load saved or default
  const savedAccent = localStorage.getItem("anjan_portfolio_accent") || "emerald";
  applyAccent(savedAccent);

  // Dropdown toggle
  if (themeBtn && themeMenu) {
    themeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isExpanded = themeBtn.getAttribute("aria-expanded") === "true";
      themeBtn.setAttribute("aria-expanded", !isExpanded);
      themeMenu.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (!themeMenu.contains(e.target) && e.target !== themeBtn) {
        themeMenu.classList.remove("open");
        themeBtn.setAttribute("aria-expanded", "false");
      }
    });

    accentButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const accent = btn.getAttribute("data-accent");
        applyAccent(accent);
        themeMenu.classList.remove("open");
        themeBtn.setAttribute("aria-expanded", "false");
        showToast(`Accent updated to ${accent.charAt(0).toUpperCase() + accent.slice(1)}!`);
      });
    });
  }
}

/* ====================================================================
 * 2. NAVIGATION & MOBILE DRAWER
 * ==================================================================== */
function initNavigation() {
  const header = document.querySelector(".site-header");
  const navToggle = document.getElementById("nav-toggle");
  const navDrawer = document.getElementById("nav-drawer");
  const navLinks = document.querySelectorAll(".nav-link");
  const drawerLinks = document.querySelectorAll(".drawer-link");

  // Sticky header background transition
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  if (navToggle && navDrawer) {
    navToggle.addEventListener("click", () => {
      const isOpen = navDrawer.classList.contains("open");
      navDrawer.classList.toggle("open");
      navToggle.classList.toggle("active");
      navToggle.setAttribute("aria-expanded", !isOpen);
      document.body.classList.toggle("no-scroll", !isOpen);
    });

    drawerLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navDrawer.classList.remove("open");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
      });
    });
  }

  // Active link scroll spy
  const sections = document.querySelectorAll("section[id]");
  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset + 120;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }
  window.addEventListener("scroll", highlightNavOnScroll);
}

/* ====================================================================
 * 3. SKILLS CATEGORY FILTER
 * ==================================================================== */
function initSkillsFilter(skillsData) {
  const container = document.getElementById("skills-grid");
  const filterBtns = document.querySelectorAll(".skills-tab-btn");
  if (!container || !skillsData) return;

  function renderSkills(category = "all") {
    container.innerHTML = "";

    let items = [];
    if (category === "all") {
      Object.keys(skillsData).forEach((catKey) => {
        items = items.concat(skillsData[catKey]);
      });
    } else if (skillsData[category]) {
      items = skillsData[category];
    }

    items.forEach((skill) => {
      const card = document.createElement("div");
      card.className = "skill-card";
      card.innerHTML = `
        <div class="skill-header">
          <span class="skill-icon" aria-hidden="true">${skill.icon}</span>
          <div class="skill-meta">
            <h4 class="skill-name">${skill.name}</h4>
            <span class="skill-badge">${skill.level}</span>
          </div>
        </div>
        <p class="skill-note">${skill.note}</p>
      `;
      container.appendChild(card);
    });
  }

  renderSkills("all");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-category");
      renderSkills(category);
    });
  });
}

/* ====================================================================
 * 4. PROJECTS SHOWCASE & ARCHITECTURE MODALS
 * ==================================================================== */
function initProjects(projects) {
  const container = document.getElementById("projects-grid");
  if (!container || !projects) return;

  container.innerHTML = "";

  projects.forEach((proj) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.setAttribute("data-id", proj.id);

    const techTags = proj.technologies
      .slice(0, 4)
      .map((t) => `<span class="tech-tag">${t}</span>`)
      .join("");

    card.innerHTML = `
      <div class="project-media">
        <img src="${proj.image}" alt="${proj.title} preview" loading="lazy" class="project-img">
        <div class="project-overlay">
          <button type="button" class="btn-preview-details" data-modal="project" data-id="${proj.id}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            Architecture &amp; Details
          </button>
        </div>
      </div>
      <div class="project-body">
        <div class="project-badge-row">
          <span class="project-category-badge">${proj.badge}</span>
        </div>
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.shortDesc}</p>
        
        <div class="project-problem-box">
          <span class="problem-label">Problem Solved:</span>
          <p class="problem-text">${proj.problemSolved}</p>
        </div>

        <div class="project-tech-list">
          ${techTags}
        </div>

        <div class="project-actions">
          <button type="button" class="btn-action btn-outline btn-deep-dive" data-modal="project" data-id="${proj.id}">
            Deep Dive
          </button>
          <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-action btn-icon-link" aria-label="GitHub Repository for ${proj.title}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            Code
          </a>
          <button type="button" class="btn-action btn-icon-link btn-interactive-demo" data-id="${proj.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Live Demo
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach event listener to project demo buttons
  document.querySelectorAll(".btn-interactive-demo").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const proj = projects.find((p) => p.id === id);
      if (!proj) return;

      if (id === "pytask-cli") {
        // Smooth scroll to hero terminal and run command
        const heroSection = document.getElementById("home");
        if (heroSection) heroSection.scrollIntoView({ behavior: "smooth" });
        const termTabBtn = document.querySelector('[data-tab="terminal"]');
        if (termTabBtn) termTabBtn.click();
        const termInput = document.getElementById("terminal-input");
        if (termInput) {
          termInput.value = "python pytask";
          const form = document.getElementById("terminal-form");
          if (form) form.dispatchEvent(new Event("submit"));
        }
        showToast("Switched to Hero Terminal Demo for PyTask CLI!");
      } else {
        openProjectModal(proj);
      }
    });
  });
}

/* ====================================================================
 * 5. MODAL SYSTEMS (PROJECT DEEP DIVE & RESUME VIEWER)
 * ==================================================================== */
function initModals(data) {
  const modalContainer = document.getElementById("global-modal");
  const modalBody = document.getElementById("modal-body-content");
  const modalClose = document.getElementById("modal-close-btn");

  if (!modalContainer || !modalBody || !modalClose) return;

  function closeModal() {
    modalContainer.classList.remove("open");
    modalContainer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  modalClose.addEventListener("click", closeModal);
  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("open")) {
      closeModal();
    }
  });

  // Global Project Deep Dive Trigger
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest('[data-modal="project"]');
    if (trigger) {
      const projId = trigger.getAttribute("data-id");
      const proj = data.projects.find((p) => p.id === projId);
      if (proj) openProjectModal(proj);
    }
  });

  // Resume Modal Trigger
  const resumeTriggers = document.querySelectorAll('[data-trigger="resume"]');
  resumeTriggers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openResumeModal(data);
    });
  });

  window.openProjectModal = function (proj) {
    const techPills = proj.technologies
      .map((t) => `<span class="tech-tag">${t}</span>`)
      .join("");
    const featureList = proj.keyFeatures
      .map((f) => `<li><span class="feat-check">✓</span> ${f}</li>`)
      .join("");

    modalBody.innerHTML = `
      <div class="modal-project-view">
        <div class="modal-header-banner">
          <span class="project-category-badge">${proj.badge}</span>
          <h2 class="modal-title">${proj.title}</h2>
          <p class="modal-subtitle">${proj.subtitle}</p>
        </div>

        <div class="modal-img-wrap">
          <img src="${proj.image}" alt="${proj.title} architecture" class="modal-project-img">
        </div>

        <div class="modal-section">
          <h3 class="modal-sec-title">🎯 Problem &amp; Core Motivation</h3>
          <p class="modal-sec-text">${proj.problemSolved}</p>
        </div>

        <div class="modal-section">
          <h3 class="modal-sec-title">⚙️ Architecture &amp; Technical Design</h3>
          <p class="modal-sec-text">${proj.deepDive.architecture}</p>
        </div>

        <div class="modal-section">
          <h3 class="modal-sec-title">🧩 Technical Challenges Overcome</h3>
          <p class="modal-sec-text">${proj.deepDive.challenges}</p>
        </div>

        <div class="modal-section">
          <h3 class="modal-sec-title">✨ Key Engineering Features</h3>
          <ul class="modal-feat-list">
            ${featureList}
          </ul>
        </div>

        <div class="modal-section">
          <h3 class="modal-sec-title">💡 Core Takeaways &amp; Learnings</h3>
          <p class="modal-sec-text">${proj.deepDive.takeaway}</p>
        </div>

        <div class="modal-section">
          <h3 class="modal-sec-title">🛠️ Technologies Used</h3>
          <div class="project-tech-list">
            ${techPills}
          </div>
        </div>

        <div class="modal-footer-actions">
          <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            View GitHub Repository
          </a>
          <button type="button" class="btn-secondary" onclick="document.getElementById('modal-close-btn').click()">
            Close Details
          </button>
        </div>
      </div>
    `;

    modalContainer.classList.add("open");
    modalContainer.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };

  function openResumeModal(portfolio) {
    const p = portfolio.profile;
    const edu = portfolio.education;
    const skills = portfolio.skills;

    modalBody.innerHTML = `
      <div class="resume-sheet">
        <div class="resume-toolbar no-print">
          <div class="resume-meta">
            <span class="resume-badge">Verified Student Profile</span>
            <span class="resume-date">Updated 2024 / 1st Year</span>
          </div>
          <div class="resume-btn-group">
            <button type="button" class="btn-resume-action" onclick="window.print()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              Print / Save PDF
            </button>
          </div>
        </div>

        <header class="resume-header">
          <h1 class="resume-name">${p.name}</h1>
          <p class="resume-role">${p.role} • 1st-Year Technology Undergraduate</p>
          <div class="resume-contact-bar">
            <span>📍 ${p.location}</span>
            <span>✉️ ${p.email}</span>
            <span>🐙 github.com/anjantripathi</span>
            <span>💼 linkedin.com/in/anjantripathi</span>
          </div>
        </header>

        <section class="resume-sec">
          <h2 class="resume-heading">EDUCATION</h2>
          <div class="resume-item">
            <div class="resume-row">
              <strong>${edu.institution}</strong>
              <span class="resume-loc">${edu.location}</span>
            </div>
            <div class="resume-row">
              <em>${edu.degree}</em>
              <span class="resume-date">${edu.duration} (${edu.currentYear})</span>
            </div>
            <p class="resume-text">${edu.description}</p>
            <p class="resume-text"><strong>Relevant Coursework:</strong> ${edu.coursework.join(", ")}</p>
          </div>
        </section>

        <section class="resume-sec">
          <h2 class="resume-heading">TECHNICAL SKILLS</h2>
          <ul class="resume-skills-list">
            <li><strong>Programming Languages:</strong> Python (OOP, Scripting, Automation), Modern CSS3, HTML5 Semantic, JavaScript (ES6+), C / C++</li>
            <li><strong>Frontend &amp; Styling:</strong> CSS Grid, Flexbox, Custom Properties, Responsive UI Design, Tailwind CSS</li>
            <li><strong>Developer Tools:</strong> Git, GitHub, VS Code, Linux Terminal / Zsh, Chrome DevTools, Markdown</li>
            <li><strong>CS Foundations:</strong> Data Structures &amp; Algorithms (Foundations), Object-Oriented Design, Modular Code Architecture</li>
          </ul>
        </section>

        <section class="resume-sec">
          <h2 class="resume-heading">FEATURED PROJECTS</h2>
          ${portfolio.projects
            .map(
              (proj) => `
            <div class="resume-item">
              <div class="resume-row">
                <strong>${proj.title}</strong>
                <span class="resume-tech">${proj.technologies.slice(0, 3).join(", ")}</span>
              </div>
              <p class="resume-text">${proj.shortDesc}</p>
              <ul class="resume-bullets">
                ${proj.keyFeatures.slice(0, 2).map((kf) => `<li>${kf}</li>`).join("")}
              </ul>
            </div>
          `
            )
            .join("")}
        </section>

        <section class="resume-sec">
          <h2 class="resume-heading">LEARNING PHILOSOPHY &amp; ACTIVITIES</h2>
          <p class="resume-text">Active participant in coding challenges and student tech communities at Newton School of Technology. Dedicated to practical problem-solving, clean code design, and continuous learning by building software from first principles.</p>
        </section>
      </div>
    `;

    modalContainer.classList.add("open");
    modalContainer.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }
}

/* ====================================================================
 * 6. CONTACT FORM & VALIDATION
 * ==================================================================== */
function initContactForm(profile) {
  const form = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");
  if (!form || !formFeedback) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const subject = form.elements["subject"].value.trim();
    const message = form.elements["message"].value.trim();

    // Reset previous errors
    clearErrors(form);

    let hasError = false;

    if (!name || name.length < 2) {
      showFieldError("name", "Please enter your name (at least 2 characters).");
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showFieldError("email", "Please enter a valid email address.");
      hasError = true;
    }

    if (!subject || subject.length < 3) {
      showFieldError("subject", "Please provide a subject line.");
      hasError = true;
    }

    if (!message || message.length < 10) {
      showFieldError("message", "Your message should be at least 10 characters.");
      hasError = true;
    }

    if (hasError) return;

    // Simulated submission state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg>
      Sending message...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      formFeedback.className = "form-feedback-box success";
      formFeedback.innerHTML = `
        <div class="feedback-content">
          <div class="feedback-icon">✓</div>
          <div>
            <strong>Message Received!</strong>
            <p>Thank you, ${escapeHtml(name)}. I'll get back to you at <em>${escapeHtml(email)}</em> soon.</p>
            <div class="feedback-developer-note">
              <span>💡 Developer note:</span> This contact form is wired for client-side validation. To connect it to your live inbox for production, you can link it directly to a free service like <strong>Formspree</strong> (action="https://formspree.io/f/YOUR_ID") or <strong>EmailJS</strong> with a single configuration!
            </div>
          </div>
        </div>
      `;
      formFeedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
      showToast("Message sent successfully!");
    }, 1200);
  });

  function showFieldError(fieldName, message) {
    const field = form.elements[fieldName];
    if (field) {
      field.classList.add("input-error");
      const errEl = document.getElementById(`${fieldName}-error`);
      if (errEl) errEl.textContent = message;
    }
  }

  function clearErrors(formEl) {
    formEl.querySelectorAll(".input-error").forEach((el) => el.classList.remove("input-error"));
    formEl.querySelectorAll(".field-error-msg").forEach((el) => (el.textContent = ""));
    formFeedback.className = "form-feedback-box hidden";
    formFeedback.innerHTML = "";
  }
}

/* ====================================================================
 * 7. ONE-CLICK EMAIL COPY & TOAST NOTIFICATION
 * ==================================================================== */
function initCopyEmail(profile) {
  const copyButtons = document.querySelectorAll(".btn-copy-email");
  const email = profile?.email || "anjantripathi.tech@gmail.com";

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied ${email} to clipboard!`);
        });
      } else {
        // Fallback
        const temp = document.createElement("input");
        temp.value = email;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
        showToast(`Copied ${email} to clipboard!`);
      }
    });
  });
}

function showToast(message) {
  let toast = document.getElementById("site-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "site-toast";
    toast.className = "site-toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.__toastTimeout);
  window.__toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

/* ====================================================================
 * 8. BACK TO TOP & SCROLL REVEAL
 * ==================================================================== */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((el) => observer.observe(el));
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
