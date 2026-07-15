// ======================== GALLERY FILTER ========================
export function initGaleriaFilter() {
  const filters = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gitem[data-category]');

  if (!filters.length || !items.length) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active filter button
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
          // Reset reveal animation for newly shown items
          item.classList.remove('visible');
          requestAnimationFrame(() => {
            item.classList.add('visible');
          });
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

// Auto-init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initGaleriaFilter();
});
