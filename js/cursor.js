// ======================== CURSOR ========================
export function initCursor() {
  const dot = document.getElementById('cursor');
  const outline = document.getElementById('cursor-outline');
  
  let mouseX = 0, mouseY = 0;
  let outX = 0, outY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Smooth outline follows with lag
  function animateCursor() {
    outX += (mouseX - outX) * 0.12;
    outY += (mouseY - outY) * 0.12;
    outline.style.left = outX + 'px';
    outline.style.top = outY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover state on interactive elements
  const interactives = document.querySelectorAll('a, button, .blob-wrap, .cta-btn, .paseo-arrow, .nav-link, .nav-cta, .gitem');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hovering'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hovering'));
  });
}
