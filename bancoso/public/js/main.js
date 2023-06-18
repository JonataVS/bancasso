function loadFormSubmit () {
    const form = document.querySelector('form');

    form.onsubmit = async (event) => {
        event.preventDefault();

        const name = document.querySelector('#name').value.replace(',',',');

        const email = document.querySelector('#email').value;

        const senha = document.querySelector('#senha').value;

        const sexo =  document.querySelector('#sexo').value;

        const response = await fetch('/usuario', {
            method: 'post',
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        form.reset();

        document.querySelector('')

    }
}

loadFormSubmit();