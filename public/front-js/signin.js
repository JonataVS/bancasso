import API from './lib/auth.js';

window.handleSubmit = handleSubmit;

const form = document.querySelector('form');

async function handleSubmit(event) {
  event.preventDefault();

  const usuario = Object.fromEntries(new FormData(form));

  const config = {
    method: 'post',
    body: JSON.stringify(usuario),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch('/login', config);

  const { auth, token } = await response.json();

  if(auth) {
    API.login(token);
  } else {
    console.log('Erro no login');
  }
}