import API from './lib/auth.js';

// genPostagem contains the HTML of the post

function genPostagem(postagem) {
  const html = `
    <div class="postagem" id="Cod_Post-${postagem.Cod_Post}">
    <h1>${postagem.titulo}</h1>
    <p>${postagem.conteudo}</p>
    <br>
    <form action="/posts/${postagem.Cod_Post}" method="POST">
    <label for="titulo">Edite seu título</label><br>
    <input type="text" name="titulo" maxlength="500" required><br>
    <label for="conteudo">Edite seu conteúdo</label><br>
    <textarea name="conteudo" required></textarea><br>
    <button type="submit" class="fa-solid fa-pen-to-square fa-lg"></button>
    <button type="submit" class="fa-sharp fa-solid fa-trash fa-lg" id="delete" value="Cod_Post-${postagem.usuarioId}"></button>
    </form><br>
</div>
    `;
  return html;
}

// insertPost insert post in body HTML

 function insertPost(postagem) {
  const gridPost = document.querySelector('.grid-posts');
  const postagemView = genPostagem(postagem);

//  console.log(gridPost, 'gridpost');

  gridPost.insertAdjacentHTML('beforeend', postagemView);

  // function button for remove post

  const localPost = gridPost.querySelector(`#Cod_Post-${postagem.Cod_Post}`);

  const deleteButton = localPost.querySelector('#delete');

  deleteButton.onclick = () => {
    fetch(`/posts/${postagem.Cod_Post}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${API.getToken()}`,
      },
    });

    localPost.remove();
  };
}

// showPostagens return posts in HTML

async function showPostagens() {
  const postagens = await fetch('/getposts', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API.getToken()}`, 
    },
  }).then((res) => res.json());

  console.log(postagens);

  postagens.forEach((element) => insertPost(element));
}

//showPostagens();

if(API.isAuthenticated()) {
  showPostagens();
}