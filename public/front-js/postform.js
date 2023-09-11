import API from './lib/auth.js';

const form = document.querySelector('form');
console.log(form);

function loadFormSubmit() {
  form.onsubmit = async (event) => {
    event.preventDefault();

    const Postagem = Object.fromEntries(new FormData(form));

    const response = await fetch('/newpost', {
      method: 'POST',
      body: JSON.stringify(Postagem),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API.getToken()}`,
      },
    });

    const newpost = await response.json();

    console.log(newpost);
  };
}

if (API.isAuthenticated()) {
  loadFormSubmit();
}
