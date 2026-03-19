document.querySelectorAll('.product').forEach(product => {
  const slider = product.querySelector('.slider');
  const dots   = product.querySelectorAll('.dot');
  const total  = slider.querySelectorAll('img').length;
  let current  = 0;

  function goTo(index) {
    current = Math.max(0, Math.min(index, total - 1));
    const w = slider.clientWidth;
    slider.scrollTo({ left: current * w, behavior: 'smooth' });
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  // Kropki
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Sync kropek przy swipe
  slider.addEventListener('scroll', () => {
    const w = slider.clientWidth;
    const idx = Math.round(slider.scrollLeft / w);
    if (idx !== current) {
      current = idx;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }
  }, { passive: true });

  // Drag myszą na desktopie
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  slider.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => { isDown = false; });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    const w = slider.clientWidth;
    const idx = Math.round(slider.scrollLeft / w);
    goTo(idx);
  });

  slider.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
  });

  goTo(0);
});