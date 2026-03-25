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

function isMobile() {
  return window.matchMedia('(hover: none)').matches;
}

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
      if (isMobile()) {
        openMobilePanel(product, imgs[current].src);
      }
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

// MOBILE PANEL
const mobilePanel      = document.getElementById('mobilePanel');
const mobilePanelImg   = document.getElementById('mobilePanelImg');
const mobilePanelName  = document.getElementById('mobilePanelName');
const mobilePanelDesc  = document.getElementById('mobilePanelDesc');
const mobilePanelPrice = document.getElementById('mobilePanelPrice');
const mobilePanelClose = document.getElementById('mobilePanelClose');

function openMobilePanel(product, imgSrc) {
  const name  = product.querySelector('.overlay-name')?.textContent  || '';
  const desc  = product.querySelector('.overlay-desc')?.textContent  || '';
  const price = product.querySelector('.overlay-price')?.textContent || '';

  mobilePanelImg.src            = imgSrc;
  mobilePanelName.textContent   = name;
  mobilePanelDesc.textContent   = desc;
  mobilePanelPrice.textContent  = price;

  mobilePanel.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobilePanel() {
  mobilePanel.classList.remove('open');
  document.body.style.overflow = '';
}

mobilePanelClose.addEventListener('click', closeMobilePanel);

// LIGHTBOX (desktop only)
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.slider-wrap').forEach(wrap => {
  wrap.addEventListener('click', () => {
    if (isMobile()) return;
    const product   = wrap.closest('.product');
    const activeImg = product.querySelector('.slider img.active');
    if (!activeImg) return;

    lightboxImg.src             = activeImg.src;
    lightboxImg.style.width     = '80vw';
    lightboxImg.style.height    = '80vh';
    lightboxImg.style.maxWidth  = '80vw';
    lightboxImg.style.maxHeight = '80vh';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
});

lightboxClose.addEventListener('click', e => {
  e.stopPropagation();
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    lightbox.classList.remove('open');
    mobilePanel.classList.remove('open');
    document.body.style.overflow = '';
  }
});