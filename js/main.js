/* ===================================================
   Cooperative Tech — Main JavaScript
   =================================================== */

// ─── Navbar scroll effect ───────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ─── Mobile Menu ────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileServicesBtn = document.getElementById('mobileServicesBtn');
const mobileServicesPanel = document.getElementById('mobileServicesPanel');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    // Swap icon
    hamburger.innerHTML = isOpen
      ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>`;
  });
}

if (mobileServicesBtn && mobileServicesPanel) {
  mobileServicesBtn.addEventListener('click', () => {
    const isOpen = mobileServicesPanel.style.maxHeight && mobileServicesPanel.style.maxHeight !== '0px';
    mobileServicesPanel.style.maxHeight = isOpen ? '0px' : mobileServicesPanel.scrollHeight + 'px';
    mobileServicesBtn.classList.toggle('open', !isOpen);
  });
}

// Close mobile menu when clicking a link
if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      if (hamburger) {
        hamburger.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>`;
      }
    });
  });
}

// ─── Scroll Animation (Intersection Observer) ───────
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '-60px 0px' });

  fadeEls.forEach(el => {
    // Skip hero elements — they animate via CSS keyframes
    if (!el.closest('.hero')) {
      observer.observe(el);
    } else {
      el.classList.add('visible');
    }
  });
}

// ─── Chart bar animation (hero) ─────────────────────
const bars = document.querySelectorAll('.hero__bar');
if (bars.length) {
  const heights = [40, 65, 45, 80, 60, 90, 75, 95, 70, 88, 85, 100];
  bars.forEach((bar, i) => {
    bar.style.height = heights[i % heights.length] + '%';
    bar.style.animationDelay = (0.4 + i * 0.04) + 's';
  });
}

// ─── Contact Form ────────────────────────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `
        <svg class="spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="20" height="20">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="40" stroke-dashoffset="30" stroke-linecap="round"/>
        </svg>
        Sending...
      `;
    }
    try {
      const response = await fetch('https://formspree.io/f/mqegewqy', {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        contactForm.style.display = 'none';
        if (formSuccess) formSuccess.classList.add('visible');
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg> Send Message`;
      }
      alert('Something went wrong. Please try again or email us directly at hello@teamcooptech.com');
    }
  });
}

const resetFormBtn = document.getElementById('resetForm');
if (resetFormBtn && contactForm && formSuccess) {
  resetFormBtn.addEventListener('click', () => {
    formSuccess.classList.remove('visible');
    contactForm.style.display = '';
    contactForm.reset();
    const btn = contactForm.querySelector('.btn-submit');
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
        Send Message
      `;
    }
  });
}

// Mobile services sub-panel init
if (mobileServicesPanel) {
  mobileServicesPanel.style.maxHeight = '0px';
  mobileServicesPanel.style.overflow = 'hidden';
  mobileServicesPanel.style.transition = 'max-height 0.3s ease';
}

/* Spin animation for submit button */
const style = document.createElement('style');
style.textContent = `.spin { animation: spin 0.8s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(style);
