// ======================== MARQUEE (blob shapes) ========================
export function initMarquee() {
  const track = document.getElementById('marquee-track');
  if (!track) return;

  let x = 0;
  let speed = 1.2;
  let targetSpeed = 1.2;
  let lastMouseX = 0;
  let lastMouseTime = Date.now();

  // Mouse velocity → speed boost
  window.addEventListener('mousemove', (e) => {
    const now = Date.now();
    const dt = Math.max(1, now - lastMouseTime);
    const vx = Math.abs(e.clientX - lastMouseX) / dt;
    targetSpeed = 1.2 + vx * 8;
    targetSpeed = Math.min(targetSpeed, 16);
    lastMouseX = e.clientX;
    lastMouseTime = now;
  });

  // Decay back to base speed
  setInterval(() => {
    if (Date.now() - lastMouseTime > 80) targetSpeed = 1.2;
  }, 80);

  // Total width of ONE set of clones (there are 3 copies baked into HTML)
  // We measure once DOM is ready
  let setWidth = 0;

  function measure() {
    // items: the first 4 blob-wraps = one set
    const items = Array.from(track.children).slice(0, 4);
    setWidth = 0;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    items.forEach(item => {
      setWidth += item.offsetWidth + gap;
    });
  }

  setTimeout(measure, 200);
  window.addEventListener('resize', measure);

  function tick() {
    speed += (targetSpeed - speed) * 0.06;
    x -= speed;

    // Loop back
    if (setWidth > 0 && Math.abs(x) >= setWidth) {
      x += setWidth;
    }

    track.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(tick);
  }
  tick();

  // Parallax on mousemove
  const title = document.getElementById('hero-title');
  window.addEventListener('mousemove', (e) => {
    const cx = (e.clientX / window.innerWidth - 0.5) * 2;
    const cy = (e.clientY / window.innerHeight - 0.5) * 2;
    if (title) {
      title.style.transform = `translate(${cx * -22}px, ${cy * -12}px)`;
    }
  });
}

// ======================== TEXT MARQUEE ========================
export function initTextMarquee() {
  const track = document.getElementById('text-marquee-track');
  if (!track) return;

  // Clone items to make it truly infinite
  const clone = track.cloneNode(true);
  track.parentElement.appendChild(clone);

  let x = 0;
  const speed = 1.4;

  function tick() {
    x -= speed;
    const trackW = track.scrollWidth;
    if (Math.abs(x) >= trackW) x = 0;
    track.style.transform = `translateX(${x}px)`;
    clone.style.transform = `translateX(${x + trackW}px)`;
    requestAnimationFrame(tick);
  }
  tick();
}
