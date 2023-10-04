window.handleSubmit = handleSubmit;

const form = document.querySelector('form');

// esses são as const e as validações de cada input 

const senhaInput = form.senha;
const senhaFeedback = document.querySelector('#senha + .invalid-feedback');

const emailInput = form.email;
const emailFeedback = document.querySelector('#email + .invalid-feedback');

const nomeInput = form.nome;
const nomeFeedback = document.querySelector('#nome + .invalid-feedback');


async function handleSubmit(event) {
  event.preventDefault();
  checkForm()

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
  }

};

// função para escutar cada input e excutar a função que está dentro dele

nomeInput.addEventListener('input', function () {
  checkname()
})

emailInput.addEventListener('input', function () {
  checkemail()
})

senhaInput.addEventListener('input', function () {
  checksenha()
})


function checkForm(){
  checkemail()
  checkname()
  checksenha()
}



// validação de nome

function checkname() {
  const nome = nomeInput.value

  if (nome === "") {
    nomeFeedback.style.visibility = 'visible';
  } else {
    nomeFeedback.style.visibility = 'hidden';
  }
}

// validacão de email

function checkemail() {
  const email = emailInput.value;

  if (email === "") {
    emailFeedback.style.visibility = 'visible';
  } else {
    emailFeedback.style.visibility = 'hidden';
  }
}

// validação de senha

function checksenha() {
  const senha = senhaInput.value;

  if (senha.length < 8) {
    senhaFeedback.style.visibility = 'visible';
  } else {
    senhaFeedback.style.visibility = 'hidden';
  }
}

