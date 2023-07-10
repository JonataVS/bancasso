function genPostagem (postagem) {
    const html = `
    <div>
    <h1>${postagem.titulo}</h1>
    <p>${postagem.conteudo}</p>
    </div>`

    console.log(postagem)

    return html
}

async function showPostagens () {
    const postagens = await fetch('/posts',{method:'GET'})
    try {
        postagens
    } catch(e) {
        next(e)
    }

    console.log(postagens)
}