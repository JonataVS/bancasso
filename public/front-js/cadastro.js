window.handleSubmit = handleSubmit;

const form = document.querySelector('form');

async function handleSubmit(event) {
  event.preventDefault();

  if (form.checkValidity()) {
    const usuario = Object.fromEntries(new FormData(form));

    const config = {
      method: 'post',
      body: JSON.stringify(usuario),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch('/usuario', config);

    if (response.ok) {
      location.href = '/entrar';
    } else {
      console.log('Error no cadastro');
    }
  } else {
    form.classList.add('was-validated');
  }
};