/**
 * Shared Service Page Renderer
 *
 * Each service HTML page defines a `SERVICE` config object, then calls
 * renderServicePage() to inject the content into the DOM.
 */

function renderServicePage(s) {
  // ── NAV active state ──
  document.querySelectorAll('.navbar__dropdown-link').forEach(el => {
    if (el.getAttribute('href') && el.getAttribute('href').includes(s.id)) {
      el.style.color = 'var(--blue)';
      el.style.fontWeight = '600';
    }
  });

  // ── Page title + meta ──
  document.title = s.pageTitle + ' | Cooperative Tech';
  document.querySelector('meta[name="description"]').setAttribute('content', s.metaDescription);

  // ── Hero icon ──
  document.getElementById('heroIcon').innerHTML = s.icon;
  document.getElementById('heroIcon').style.background = `linear-gradient(135deg, ${s.color1}, ${s.color2})`;
  document.getElementById('heroBadge').textContent = s.title;
  document.getElementById('heroTitle').textContent = s.heroTitle;
  document.getElementById('heroSub').textContent = s.heroSub;

  // ── Benefits ──
  const benefitsList = document.getElementById('benefitsList');
  s.benefits.forEach(b => {
    benefitsList.innerHTML += `
      <div class="check-item">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" width="18" height="18" style="color:${s.color1};flex-shrink:0;margin-top:1px"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <span>${b}</span>
      </div>`;
  });

  // ── Features ──
  const featuresGrid = document.getElementById('featuresGrid');
  s.features.forEach(f => {
    featuresGrid.innerHTML += `
      <div class="card feature-card fade-up">
        <div class="feature-card__icon" style="background:${s.bgLight}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="${s.color1}" stroke-width="1.75" width="24" height="24">${f.icon}</svg>
        </div>
        <div class="feature-card__title">${f.title}</div>
        <div class="feature-card__desc">${f.desc}</div>
      </div>`;
  });

  // ── Steps ──
  const stepsGrid = document.getElementById('stepsGrid');
  s.steps.forEach(step => {
    stepsGrid.innerHTML += `
      <div class="step fade-up">
        <div class="step__number" style="background:linear-gradient(135deg,${s.color1},${s.color2})">${step.num}</div>
        <div class="step__title">${step.title}</div>
        <div class="step__desc">${step.desc}</div>
      </div>`;
  });

  // ── CTA heading ──
  document.getElementById('ctaHeading').textContent = `Let's Get Your ${s.title} Set Up`;
}
