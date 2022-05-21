const btnMenu = document.querySelector('#btn-menu');
const menu = document.querySelector('.navbar__item:first-child');

const form = document.querySelector('form');
const formInput = document.querySelector('#form-input');
const error = document.querySelector('.resultado-error');
const resultado = document.querySelector('.acortador__resultado');
const res_enlace = document.querySelector('#acortador__enlace');
const res_info = document.querySelector('#acortador__info');
const res_copiar = document.querySelector('#acortador__copiar');

let enlace;
btnMenu.addEventListener('click', () => {
   menu.classList.toggle('navbar__item');
   menu.classList.toggle('navbar__item--active');
   console.log("si")
});

form.addEventListener('submit', (e) => {
   e.preventDefault();
   const formData = new FormData(form);
   const url = formData.get('url');
   llamarApi(url);
});

async function llamarApi(url) {
   const espera = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
   const data = await espera.json();
   if (!espera.ok){
      formInput.style.border = '1px solid red';
      return;
   }
   formInput.style.border = '1px solid green';
   resultado.style.display = 'flex';
   res_enlace.innerHTML = url;
   res_info.innerHTML = data.result.full_short_link;
   res_info.href = data.result.full_short_link;
   enlace = data.result.full_short_link;
   form.reset();
}

res_copiar.addEventListener('click', () => {
   navigator.clipboard.writeText(enlace);
   res_copiar.innerHTML = 'Copiado!';
});