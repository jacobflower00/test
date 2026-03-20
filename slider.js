const navShop    = document.getElementById('navShop');
const navSizing  = document.getElementById('navSizing');
const brandLink  = document.getElementById('brandLink');
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
  const imgs    = Array.from(slider.querySelectorAll('img'));
  const dots    = product.querySelectorAll('.dot-btn');
  const overlay = product.querySelector('.product-overlay');
  const total   = imgs.length;
  let current   = 0;
  let animating = false;

  imgs[0].classList.add('active');

  function goTo(index) {
    if (animating || index === current) return;
    animating = true;
    imgs[current].classList.remove('active');
    imgs[index].classList.add('active');
    current = index;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    setTimeout(() => { animating = false; }, 650);
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

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
    if (Math.abs(touchDeltaX) > 40) {
      if (touchDeltaX < 0 && current < total - 1) goTo(current + 1);
      if (touchDeltaX > 0 && current > 0) goTo(current - 1);
    } else {
      overlay.classList.toggle('visible');
    }
  }, { passive: true });

  let isDown    = false;
  let startX    = 0;
  let dragDelta = 0;

  wrap.addEventListener('mousedown', e => {
    isDown    = true;
    startX    = e.pageX;
    dragDelta = 0;
  });

  wrap.addEventListener('mouseleave', () => { isDown = false; });

  wrap.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    if (Math.abs(dragDelta) > 40) {
      if (dragDelta < 0 && current < total - 1) goTo(current + 1);
      if (dragDelta > 0 && current > 0) goTo(current - 1);
    }
  });

  wrap.addEventListener('mousemove', e => {
    if (!isDown) return;
    dragDelta = e.pageX - startX;
  });
});