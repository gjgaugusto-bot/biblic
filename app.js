function ensureSearchInput(){
  const existing=document.getElementById('search');
  if(existing) return existing;
  const hero=document.querySelector('#homeView .hero');
  if(!hero) return null;
  const input=document.createElement('input');
  input.id='search';
  input.type='search';
  input.setAttribute('aria-label','Buscar um livro bíblico');
  input.placeholder='Buscar um livro bíblico...';
  hero.appendChild(input);
  return input;
}
