// ======================== PASEO VISUAL (interactive horizontal slider) ========================
export function initPaseo() {
  const section = document.getElementById('paseo-section');
  const track = document.getElementById('paseo-track');
  const fill = document.getElementById('paseo-fill');
  const counter = document.getElementById('paseo-current');

  if (!section || !track) return;

  const panels = track.querySelectorAll('.paseo-panel');
  const total = panels.length;
  let current = 0;
  let isAnimating = false;

  // Add arrow buttons programmatically
  const leftArrow = document.createElement('button');
  leftArrow.className = 'paseo-arrow left';
  leftArrow.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`;
  const rightArrow = document.createElement('button');
  rightArrow.className = 'paseo-arrow right';
  rightArrow.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
  section.appendChild(leftArrow);
  section.appendChild(rightArrow);

  function goTo(index) {
    if (isAnimating) return;
    isAnimating = true;
    current = Math.max(0, Math.min(total - 1, index));
    const offset = -current * 100;
    track.style.transition = 'transform 0.9s cubic-bezier(0.77, 0, 0.175, 1)';
    track.style.transform = `translateX(${offset}vw)`;

    // Update fill & counter
    const pct = (current / (total - 1)) * 100;
    fill.style.width = pct + '%';
    counter.textContent = String(current + 1).padStart(2, '0');

    leftArrow.style.opacity = current === 0 ? '0.3' : '1';
    rightArrow.style.opacity = current === total - 1 ? '0.3' : '1';

    setTimeout(() => { isAnimating = false; }, 950);
  }

  // Arrow clicks
  leftArrow.addEventListener('click', () => goTo(current - 1));
  rightArrow.addEventListener('click', () => goTo(current + 1));

  // Keyboard navigation when section is in view
  window.addEventListener('keydown', (e) => {
    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft') goTo(current - 1);
  });

  // Wheel / touch swipe inside the section
  let startX = 0;
  section.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  section.addEventListener('touchend', e => {
    const dx = startX - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) dx > 0 ? goTo(current + 1) : goTo(current - 1);
  });

  let wheelAcc = 0;
  let wheelTimer;
  section.addEventListener('wheel', (e) => {
    e.preventDefault();
    clearTimeout(wheelTimer);
    wheelAcc += e.deltaX || e.deltaY;
    wheelTimer = setTimeout(() => {
      if (wheelAcc > 60) goTo(current + 1);
      else if (wheelAcc < -60) goTo(current - 1);
      wheelAcc = 0;
    }, 80);
  }, { passive: false });

  // Initial state
  goTo(0);
}
