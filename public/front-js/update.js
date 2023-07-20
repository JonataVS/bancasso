/*function updatePost (postagem) {
    const html =`
    <div class="formulario">
        <form action="/posts/${postagem.Cod_Post}">
            
        <label for="titulo">Título da Postagem</label><br>

        <input type="text" name="titulo" maxlength="500" required><br>

        <label for="conteudo">Conteúdo:</label><br>

        <textarea name="conteudo" required></textarea><br>

        <input type="submit" value="update" href="/viewpost">
        </form>
    </div>`

    return html
}

function updatePost (postagem) {
    const post = document.querySelector('.update-post')
    const postagemUpdate = updatePost(postagem)

    post.insertAdjacentHTML('beforeend', postagemUpdate)
}

async function showUpdates () {
    const Updatepostagens = await fetch('/posts').then(res => res.json())

    console.log(Updatepostagens)
}

showUpdates ()*/