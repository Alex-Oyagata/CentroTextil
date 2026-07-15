export function initNav() {
  const toggle = document.getElementById('menu-toggle');
  const links = document.querySelector('.nav-links');
  const nav = document.querySelector('.nav');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
      if (nav) nav.classList.toggle('menu-open');
    });

    // Close menu when clicking a link
    links.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
        if (nav) nav.classList.remove('menu-open');
      });
    });
  }
}
