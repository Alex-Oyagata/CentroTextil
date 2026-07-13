import Lenis from 'lenis';
import { initCursor } from './cursor.js';
import { initMarquee, initTextMarquee } from './marquee.js';
import { initPaseo } from './paseo.js';
import { initBlackHole, initReveal, initAnimations } from './animations.js';

// ======================== SMOOTH SCROLL ========================
const lenis = new Lenis({
  duration: 1.3,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  mouseMultiplier: 0.9,
  smoothTouch: false,
});

// Connect lenis to RAF
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ======================== INIT ========================
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initMarquee();
  initTextMarquee();
  initPaseo();
  initBlackHole();
  initReveal();
  initAnimations();
});
