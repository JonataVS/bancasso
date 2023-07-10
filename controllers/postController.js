import postagemModel from '../src/models/Postagem.js';

function postCreateGet (req, res) {
    res.sendFile(path.join(__dirname,'../public/posts.html'))
}

async function postsDataGet (req, res, next) {
    try {
        res.json(await postagemModel.readAll())
    } catch (e) {
        next(e)
    }
}

async function postCreatePost (req, res, next) {
    try {
        const data = req.body

        data.titulo = parseString(data.titulo)
        data.conteudo = parseString(data.conteudo)

        res.redirect('/getpost')
    } catch (e) {
        next(e)
    }
}



export default { postCreateGet, postsDataGet, postCreatePost }