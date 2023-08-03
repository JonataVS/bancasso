function genPostagem (postagem) {
    const html = `
    <div class="postagem" id="Cod_Post-${postagem.Cod_Post}">
    <button type="submit" class="delete">Deletar</button>
    <h1>${postagem.titulo}</h1>
    <p>${postagem.conteudo}</p>
    </div><br>
    <div class="formulario" id="Cod_Post-${postagem.Cod_Post}">
    <form action="/posts/${postagem.Cod_Post}" method="POST">
    <label for="titulo">Título da Postagem</label><br>
    <input type="text" name="titulo" maxlength="500" required><br>
    <label for="conteudo">Conteúdo:</label><br>
    <textarea name="conteudo" required></textarea><br>
    <input type="submit" value="Editar"><br>
    </form>
</div><br>
    `
    return html
}

function insertPost (postagem) {
    const post = document.querySelector('.grid-posts')
    const postagemView = genPostagem(postagem)

    post.insertAdjacentHTML('beforeend', postagemView)
    const deleteButton = post.querySelector('.delete')

    deleteButton.onclick = () => {
        fetch(`/posts/${postagem.Cod_Post}`, {method: 'DELETE'});

        post.remove();
 }
    /*function addDeleteButton (postagem) {
        const post = document.body.querySelector(`#Cod_Post-${postagem.Cod_Post}`)
        const deleteButton = post.querySelector('.delete')
    
        deleteButton.onclick = () => {
            fetch(`/posts/${postagem.Cod_Post}`, {method: 'DELETE'});
    
            post.remove();
     }
    }*/
  
}

async function showPostagens () {
    const postagens = await fetch('/getposts').then(res => res.json())

    console.log(postagens)

    postagens.forEach(element => {
        insertPost(element)
    })
}

showPostagens ()
