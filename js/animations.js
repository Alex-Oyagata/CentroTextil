import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ======================== GRAVITY DISTORTION ========================
export function initBlackHole() {
  const dm = document.querySelector('.gravity-displacement');
  if (!dm) return;

  const blobs = document.querySelectorAll('.blob-wrap');
  let mouseX = window.innerWidth / 2;

  window.addEventListener('mousemove', e => { mouseX = e.clientX; });

  function tick() {
    const cx = window.innerWidth / 2;
    let maxInfluence = 0;

    blobs.forEach(blob => {
      const rect = blob.getBoundingClientRect();
      if (rect.width === 0) return;
      const blobCX = rect.left + rect.width / 2;
      const dist = Math.abs(cx - blobCX);
      const radius = window.innerWidth * 0.35;
      let inf = Math.max(0, 1 - dist / radius);

      const mDist = Math.abs(mouseX - blobCX);
      let mInf = Math.max(0, 1 - mDist / radius);
      inf = inf * 0.6 + mInf * 0.4;
      if (inf > maxInfluence) maxInfluence = inf;
    });

    const target = maxInfluence * 130;
    const cur = parseFloat(dm.getAttribute('scale')) || 0;
    const next = cur + (target - cur) * 0.08;
    dm.setAttribute('scale', next);
    requestAnimationFrame(tick);
  }
  tick();
}

// ======================== SCROLL REVEAL ========================
export function initReveal() {
  const items = document.querySelectorAll('.reveal-img');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  items.forEach(el => observer.observe(el));
}

// ======================== GSAP SECTION ANIMATIONS ========================
export function initAnimations() {
  // Stagger service rows
  gsap.utils.toArray('.servicio-row').forEach(row => {
    const title = row.querySelector('.servicio-title');
    const text = row.querySelector('.servicio-text-col');
    if (!title) return;

    gsap.fromTo(title, { y: 60, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: row, start: 'top 80%' }
    });

    gsap.fromTo(text.querySelectorAll('.servicio-desc, .servicio-list, .servicio-number'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out', delay: 0.15,
        scrollTrigger: { trigger: row, start: 'top 80%' }
      }
    );
  });

  // Stats counter in intro
  const stats = document.querySelectorAll('.stat-num');
  stats.forEach(el => {
    const end = el.textContent;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        el.style.color = 'var(--pink)';
        setTimeout(() => { el.style.color = ''; }, 400);
      }
    });
  });

  // Galeria grid stagger
  gsap.utils.toArray('.gitem').forEach((el, i) => {
    gsap.fromTo(el, { scale: 0.9, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 0.6, delay: (i % 4) * 0.07, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  // Intro headline split-like reveal
  const introH = document.querySelector('.intro-headline');
  if (introH) {
    gsap.fromTo(introH, { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: introH, start: 'top 80%' }
    });
  }

  // CTA headline
  const ctaH = document.querySelector('.cta-headline');
  if (ctaH) {
    gsap.fromTo(ctaH, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: ctaH, start: 'top 80%' }
    });
  }

  // Nav appearance
  const nav = document.getElementById('nav');
  if (nav) {
    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: self => {
        if (self.scroll() > 80) {
          nav.style.backdropFilter = 'blur(20px)';
          nav.style.background = 'rgba(245,243,238,0.85)';
          nav.style.mixBlendMode = 'normal';
          nav.style.borderBottom = '1px solid rgba(17,16,16,0.1)';
        } else {
          nav.style.backdropFilter = '';
          nav.style.background = '';
          nav.style.mixBlendMode = 'multiply';
          nav.style.borderBottom = '';
        }
      }
    });
  }

  // Paseo section — tell Lenis to stop and re-enable
  // (Paseo handles its own internal scroll so we don't need extra GSAP here)
}
