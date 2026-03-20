// Live date/time
function updateDate() {
  const now = new Date();
  const day   = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year  = now.getFullYear();
  const h     = String(now.getHours()).padStart(2, '0');
  const m     = String(now.getMinutes()).padStart(2, '0');
  const ampm  = now.getHours() >= 12 ? 'pm' : 'am';
  const h12   = now.getHours() % 12 || 12;
  document.getElementById('dateLine').textContent =
    `${day}/${month}/${year}  ${String(h12).padStart(2,'0')}:${m}${ampm}  LDN`;
}
updateDate();
setInterval(updateDate, 1000);

// Swatch → main photo switch
const swatches   = document.querySelectorAll('.swatch');
const mainPhoto  = document.getElementById('mainPhoto');
const photoSrcs  = Array.from(
  document.querySelectorAll('#mainPhotos span')
).map(s => s.dataset.src);

swatches.forEach(swatch => {
  swatch.addEventListener('click', () => {
    swatches.forEach(s => s.classList.remove('active'));
    swatch.classList.add('active');

    const idx = parseInt(swatch.dataset.index);
    mainPhoto.style.opacity = '0';
    setTimeout(() => {
      mainPhoto.src = photoSrcs[idx];
      mainPhoto.style.opacity = '1';
    }, 150);
  });
}); 