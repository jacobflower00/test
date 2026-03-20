const navShop   = document.getElementById('navShop');
const navSizing = document.getElementById('navSizing');
const brandLink = document.getElementById('brandLink');
const viewShop   = document.getElementById('viewShop');
const viewSizing = document.getElementById('viewSizing');

function showShop() {
  viewShop.classList.remove('hidden');
  viewSizing.classList.add('hidden');
  navShop.classList.add('active');
  navSizing.classList.remove('active');
}

function showSizing() {
  viewSizing.classList.remove('hidden');
  viewShop.classList.add('hidden');
  navSizing.classList.add('active');
  navShop.classList.remove('active');
}

navShop.addEventListener('click', e => { e.preventDefault(); showShop(); });
navSizing.addEventListener('click', e => { e.preventDefault(); showSizing(); });
brandLink.addEventListener('click', e => { e.preventDefault(); showShop(); });

document.querySelectorAll('.product').forEach(product => {
  const slider  = product.querySelector('.slider');
  const dots    = product.querySelectorAll('.dot');
  const overlay = product.querySelector('.product-overlay');
  const total   = slider.querySelectorAll('img').length;
  let current   = 0;

  function goTo(index) {
    current = Math.max(0, Math.min(index, total - 1));
    const w = slider.clientWidth;
    slider.scrollTo({ left: current * w, behavior: 'smooth' });
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  slider.addEventListener('scroll', () => {
    const w = slider.clientWidth;
    const idx = Math.round(slider.scrollLeft / w);
    if (idx !== current) {
      current = idx;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }
  }, { passive: true });

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

  let touchStartX = 0;
  let touchDeltaX = 0;
  const wrap = product.querySelector('.slider-wrap');

  wrap.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchDeltaX = 0;
  }, { passive: true });

  wrap.addEventListener('touchmove', e => {
    touchDeltaX = e.touches[0].clientX - touchStartX;
  }, { passive: true });

  wrap.addEventListener('touchend', () => {
    if (Math.abs(touchDeltaX) > 10) return;
    overlay.classList.toggle('visible');
  }, { passive: true });

  goTo(0);
});