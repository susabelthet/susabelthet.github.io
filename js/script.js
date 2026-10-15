// ===== Mobile menu =====
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => navLinks.classList.remove("open"))
  );
}

// ===== Light / dark mode =====
const themeBtn = document.getElementById("theme-toggle");
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  if (themeBtn) themeBtn.textContent = theme === "light" ? "☾" : "☀";
  try { localStorage.setItem("theme", theme); } catch (e) {}
}
let saved = "dark";
try { saved = localStorage.getItem("theme") || "dark"; } catch (e) {}
setTheme(saved);
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "dark" : "light");
  });
}

// ===== Project filter (buttons + nav dropdown + hero button) =====
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

function applyFilter(filter) {
  filterBtns.forEach(b => b.classList.toggle("active", b.dataset.filter === filter));
  projectCards.forEach(card => {
    const show = filter === "all" || card.dataset.category === filter;
    card.classList.toggle("hide", !show);
  });
}

document.querySelectorAll("[data-filter]").forEach(el => {
  el.addEventListener("click", () => applyFilter(el.dataset.filter));
});

// ===== Highlight current section in navbar =====
const sectionLinks = document.querySelectorAll(".nav-links a[data-section]");
const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let id = entry.target.id;
      if (id === "skills" || id === "interests") id = "about";
      sectionLinks.forEach(a => a.classList.toggle("active", a.dataset.section === id));
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });
sections.forEach(s => observer.observe(s));

// ===== Contact form: sends to your email via Formspree =====
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    formStatus.textContent = "Sending...";
    try {
      const res = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" }
      });
      if (res.ok) {
        formStatus.textContent = "Message sent! Thank you, I'll reply soon.";
        contactForm.reset();
      } else {
        formStatus.textContent = "Something went wrong. Please email me directly.";
      }
    } catch (err) {
      formStatus.textContent = "Something went wrong. Please email me directly.";
    }
  });
}