window.handleSubmit = handleSubmit;

const form = document.querySelector('form');

async function handleSubmit(event) {
  event.preventDefault();

  if (form.checkValidity()) {
    const Usuario = Object.fromEntries(new FormData(form));

    //console.log(usuario);

    const config = {
      method: 'post',
      body: JSON.stringify(Usuario),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    console.log(config);    

    const response = await fetch('/usuario', config);

    console.log(response);

    if (response.ok) {
      location.href = '/entrar';
    } else {
      console.log('Error no cadastro');
    }
  } else {
    form.classList.add('was-validated');
  }
};