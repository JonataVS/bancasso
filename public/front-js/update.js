function yourPostagem (postagem) {
    const html = `
    <p>Esta é a postagem que você selecionou para editar</p>
    <div class="postagem" id="Cod_Post-${postagem.Cod_Post}">
    <h1>${postagem.titulo}</h1>
    <p>${postagem.conteudo}</p>
    </div>`

    return html
}

function insertPost (postagem) {
    const post = document.querySelector('.your-post')
    const postagemView = yourPostagem(postagem)

    post.insertAdjacentElement('beforeend', postagemView)
}

async function showPostagem () {
    const postagem = await fetch('/getposts').then(res => res.json())

    console.log(postagem)
}

showPostagem ()

