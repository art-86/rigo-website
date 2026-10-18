(() => {
  const gallery = document.querySelector('.partner-gallery');
  if (!gallery) return;
  const slides = [...gallery.querySelectorAll('.partner-slide')];
  const dots = [...gallery.querySelectorAll('[data-slide]')];
  const pause = gallery.querySelector('[data-pause]');
  const count = gallery.querySelector('.gallery-count');
  let current = 0;
  let paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timer;
  function schedule() {
    clearInterval(timer);
    if (!paused && !document.hidden) timer = setInterval(() => show(current + 1), 3000);
  }
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === current)));
    if (count) count.textContent = `${current + 1} / ${slides.length}`;
  }
  function move(index) { show(index); schedule(); }
  gallery.querySelector('[data-prev]').addEventListener('click', () => move(current - 1));
  gallery.querySelector('[data-next]').addEventListener('click', () => move(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => move(i)));
  function updatePause() {
    pause.textContent = paused ? 'Продолжить' : 'Пауза';
    pause.setAttribute('aria-label', paused ? 'Включить автоматическую смену фотографий' : 'Остановить автоматическую смену фотографий');
  }
  if (pause) pause.addEventListener('click', () => { paused = !paused; updatePause(); schedule(); });
  gallery.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault(); move(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  let touchX;
  gallery.addEventListener('touchstart', e => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  gallery.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) move(current + (dx < 0 ? 1 : -1));
  }, { passive: true });
  document.addEventListener('visibilitychange', schedule);
  show(0); if (pause) updatePause(); schedule();
})();
