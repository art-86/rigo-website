(() => {
 const root = document.querySelector('.site-overview-photo');
 if (!root) return;
 const panel = root.querySelector('.site-info');
 const buttons = [...root.querySelectorAll('.site-hotspot')];
 let active;
 function close() {
   panel.hidden = true;
   buttons.forEach(b => b.setAttribute('aria-expanded', 'false'));
   active = null;
 }
 function show(button) {
   active = button;
   buttons.forEach(b => b.setAttribute('aria-expanded', String(b === button)));
   panel.querySelector('h3').textContent = button.dataset.title;
   panel.querySelector('p').textContent = button.dataset.description;
   panel.hidden = false;
   const x = button.offsetLeft, y = button.offsetTop;
   panel.style.left = Math.max(8, Math.min(x - panel.offsetWidth / 2, root.clientWidth - panel.offsetWidth - 8)) + 'px';
   panel.style.top = (y > panel.offsetHeight + 30 ? y - panel.offsetHeight - 22 : y + 24) + 'px';
 }
 buttons.forEach(button => {
   button.addEventListener('click', () => show(button));
   button.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') show(button); });
 });
 panel.querySelector('button').addEventListener('click', () => { const previous = active; close(); previous?.focus(); });
 document.addEventListener('click', e => { if (!root.contains(e.target)) close(); });
 root.addEventListener('keydown', e => { if (e.key === 'Escape') { const previous = active; close(); previous?.focus(); } });
 window.addEventListener('resize', () => { if (active) show(active); });
})();
