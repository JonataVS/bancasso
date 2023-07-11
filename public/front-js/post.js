//olha os codigos de arthur pra fazer a postagem aparecer, dessa vez vai dar certo, vambora vambora

async function showPostagens () {
    const postagens = await fetch('/posts').then(res => res.json())

    console.log(postagens)
}

showPostagens()