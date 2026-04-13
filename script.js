/* ============================================
   CRISTINA BISOL ORSO — script.js
   ============================================ */

// ── PRELOADER ──────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
    // Trigger hero animations after preloader
    triggerHeroAnimations();
  }, 2000);
});

function triggerHeroAnimations() {
  const revealEls = document.querySelectorAll('#hero .reveal-up, #hero .reveal-right');
  revealEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 140);
  });
}

// ── CURSOR ─────────────────────────────────
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Cursor hover effect
document.querySelectorAll('a, button, .skill-card, .project-card, .contact-card, .stat-card').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
});

// ── NAVBAR SCROLL ──────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── MOBILE MENU ────────────────────────────
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── THEME TOGGLE ───────────────────────────
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const sunIcon = themeToggle.querySelector('.sun');
const moonIcon = themeToggle.querySelector('.moon');

// Check saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcons(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcons(newTheme);
});

function updateThemeIcons(theme) {
  if (theme === 'light') {
    sunIcon.classList.add('active');
    moonIcon.classList.remove('active');
  } else {
    moonIcon.classList.add('active');
    sunIcon.classList.remove('active');
  }
}

// ── SMOOTH SCROLL ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── INTERSECTION OBSERVER ──────────────────
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

// Generic reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe section reveals (excluding hero which is handled separately)
document.querySelectorAll('#about .reveal-up, #skills .reveal-up, #projects .reveal-up, #contact .reveal-up').forEach(el => {
  revealObserver.observe(el);
});

// ── SECTION ANIMATIONS ─────────────────────
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const section = entry.target;

      // Animate children with stagger
      const children = section.querySelectorAll(
        '.about-text, .about-stats, .skill-card, .project-card, .contact-card, .stat-card, .section-header'
      );
      children.forEach((child, i) => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(24px)';
        child.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          });
        });
      });

      sectionObserver.unobserve(section);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('#about, #skills, #projects, #contact').forEach(s => {
  sectionObserver.observe(s);
});

// ── SKILL BARS ─────────────────────────────
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        setTimeout(() => { fill.style.width = width + '%'; }, 300);
      });
      skillBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillBarObserver.observe(skillsSection);

// ── COUNTER ANIMATION ──────────────────────
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + (target >= 100 ? 'h' : '+');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat-num');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const aboutSection = document.getElementById('about');
if (aboutSection) counterObserver.observe(aboutSection);

// ── NAV ACTIVE STATE ───────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.style.color = '');
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.style.color = 'var(--rose)';
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => activeObserver.observe(s));

// ── PARALLAX ON HERO GLOW ──────────────────
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const glow1 = document.querySelector('.hero-glow-1');
  const glow2 = document.querySelector('.hero-glow-2');
  if (glow1) glow1.style.transform = `translateY(${scrollY * 0.2}px)`;
  if (glow2) glow2.style.transform = `translateY(${scrollY * 0.1}px)`;
});

// ── TILT ON PROJECT CARDS ──────────────────
document.querySelectorAll('.project-card, .skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateX = ((y - midY) / midY) * -5;
    const rotateY = ((x - midX) / midX) * 5;
    card.style.transform = `translateY(-6px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── TYPING EFFECT ON HERO TAG ──────────────
function typeEffect(el, text, speed = 60) {
  el.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

// Start typing effect after preloader
setTimeout(() => {
  const tag = document.querySelector('.hero-tag');
  if (tag) typeEffect(tag, 'Estudante · Dev · Criativa');
}, 2300);

// ── FOOTER YEAR ────────────────────────────
const year = new Date().getFullYear();
document.querySelectorAll('strong').forEach(el => {
  if (el.textContent.includes('2025')) el.textContent = el.textContent.replace('2025', year);
});