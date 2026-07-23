/* ── Nav active link highlighting ── */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

// Scrolled shadow
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  highlightNav();
});

function highlightNav() {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
highlightNav();

/* ── Hamburger menu ── */
const hamburger = document.getElementById('hamburger');
const navList = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navList.classList.toggle('open');
  const bars = hamburger.querySelectorAll('span');
  bars[0].style.transform = navList.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
  bars[1].style.opacity = navList.classList.contains('open') ? '0' : '';
  bars[2].style.transform = navList.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
});
navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navList.classList.remove('open')));

/* ── Intersection Observer – animate cards on scroll ── */
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(
  '.timeline-card, .project-card, .ongoing-card, .cert-card, .info-card, .contact-card'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.25s cubic-bezier(.4,0,.2,1), border-color 0.25s cubic-bezier(.4,0,.2,1)';
  observer.observe(el);
});

/* ── Phase progress bar animation ── */
const progressBars = document.querySelectorAll('.phase-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const targetWidth = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => { bar.style.width = targetWidth; }, 100);
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });
progressBars.forEach(bar => barObserver.observe(bar));

/* ── Avatar upload hint ── */
const avatarHint = document.getElementById('avatar-upload-hint');
const avatarImg = document.getElementById('avatar-img');
if (avatarHint) {
  avatarHint.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          avatarImg.src = ev.target.result;
          avatarHint.innerHTML = '<span>✅ Photo updated!</span>';
          setTimeout(() => {
            avatarHint.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg><span>Change photo</span>';
          }, 2000);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  });
}

/* ── Typing effect on hero title ── */
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const text = 'Software Engineering Student';
  heroTitle.textContent = '';
  let i = 0;
  const typeInterval = setInterval(() => {
    heroTitle.textContent += text[i++];
    if (i >= text.length) clearInterval(typeInterval);
  }, 60);
}

/* ── Smooth counter for percentage labels ── */
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1200;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ── Copy to clipboard for Reg No ── */
const regEl = document.querySelector('.hero-reg span');
if (regEl) {
  regEl.style.cursor = 'pointer';
  regEl.title = 'Click to copy';
  regEl.addEventListener('click', () => {
    navigator.clipboard.writeText('2025503504').then(() => {
      regEl.textContent = 'Copied!';
      setTimeout(() => regEl.textContent = '2025503504', 1500);
    });
  });
}

/* ── Active section tag in nav ── */
window.dispatchEvent(new Event('scroll'));
