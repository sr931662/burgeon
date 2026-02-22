// ============================================================
//  BURGEON ENGINEERING — script.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Page load reveal ─────────────────────────────────────
  setTimeout(() => document.body.classList.add('loaded'), 50);

  // ── Sticky header ─────────────────────────────────────────
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Hamburger / mobile nav ────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Fade-up on scroll ─────────────────────────────────────
  const faders = document.querySelectorAll('.fade-up');
  if (faders.length) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('fade-up-active');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -20px 0px' });
    faders.forEach(el => io.observe(el));
  }

  // ── Animated counters ─────────────────────────────────────
  const counters = document.querySelectorAll('.counter[data-target]');
  if (counters.length) {
    const counterIO = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.target;
        const duration = 1800;
        const start = performance.now();
        const update = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out quad
          const eased = 1 - (1 - progress) * (1 - progress);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(update);
          else el.textContent = target;
        };
        requestAnimationFrame(update);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterIO.observe(c));
  }

  // ── Contact form ─────────────────────────────────────────
  const form = document.getElementById('contactForm');
  if (form) {
    const btn = form.querySelector('.form-submit');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name  = form.querySelector('#name')?.value.trim();
      const email = form.querySelector('#email')?.value.trim();
      const msg   = form.querySelector('#message')?.value.trim();
      if (!name || !email || !msg) {
        showFormMsg(form, 'Please fill in all required fields.', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFormMsg(form, 'Please enter a valid email address.', 'error');
        return;
      }
      // Simulate send
      btn.textContent = 'Sending…';
      btn.disabled = true;
      await new Promise(r => setTimeout(r, 1200));
      showFormMsg(form, '✓ Thank you! We\'ll be in touch within 24 hours.', 'success');
      form.reset();
      btn.textContent = 'Send inquiry →';
      btn.disabled = false;
    });
  }

  function showFormMsg(form, msg, type) {
    let el = form.querySelector('.form-msg');
    if (!el) {
      el = document.createElement('p');
      el.className = 'form-msg';
      el.style.cssText = 'margin-top:12px;font-size:0.9rem;font-weight:500;transition:all 0.3s;';
      form.appendChild(el);
    }
    el.textContent = msg;
    el.style.color = type === 'error' ? '#ff5050' : '#4ade80';
  }

  // ── Active nav link ───────────────────────────────────────
  const currentPath = window.location.pathname;
  document.querySelectorAll('.main-nav a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (currentPath.endsWith(href) || (href === '/' && currentPath === '/'))) {
      a.classList.add('active');
    }
  });

});