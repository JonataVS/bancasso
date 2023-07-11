function genPostagem (postagem) {
    const html = `
    <h1>${postagem.titulo}</h1>
    <p>${postagem.conteudo}</p>`

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