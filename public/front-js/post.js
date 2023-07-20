function genPostagem (postagem) {
    const html = `
    <div class="postagem" id="Cod_Post-${postagem.Cod_Post}">
    <h1>${postagem.titulo}</h1>
    <p>${postagem.conteudo}</p>
    <button class="postagem" value="${postagem.Cod_Post}"><a href="/atualizar">Editar</a></button>
    </div>
    `

    return html
}

function insertPost (postagem) {
    const post = document.querySelector('.grid-posts')
    const postagemView = genPostagem(postagem)

    post.insertAdjacentHTML('beforeend', postagemView)
}

async function showPostagens () {
    const postagens = await fetch('/posts').then(res => res.json())

    console.log(postagens)

    postagens.forEach(element => {
        insertPost(element)
    })
}

showPostagens ()