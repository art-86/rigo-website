document.querySelectorAll('.lead-form').forEach(form=>form.addEventListener('submit',event=>{
  event.preventDefault();if(!form.reportValidity())return;
  const status=form.querySelector('[role="status"]');
  const request=Object.fromEntries(new FormData(form));request.page=location.href;request.createdAt=new Date().toISOString();
  try{const key='rigo-local-requests';const saved=JSON.parse(localStorage.getItem(key)||'[]');saved.push(request);localStorage.setItem(key,JSON.stringify(saved.slice(-50)));status.textContent='Заявка сохранена в этом браузере. Никуда не отправлена.';form.reset();}
  catch{status.textContent='Браузер не разрешил сохранение. Заявка не сохранена и не отправлена.';}
}));
