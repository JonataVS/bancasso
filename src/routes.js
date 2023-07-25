// import de rotas e pacotes 

import { Router } from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import Usuario from './models/Usuario.js';
import Postagem from './models/Postagem.js';
// import Disciplinas from './models/Disciplinas.js';

class HTTPError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const router = Router();

//router from index

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

//router from formulário

router.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/form.html'));
});

//router from init

router.get('/init', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/init.html'))
});

//router from login

router.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/login.html'))
});

//router from fundamentos da computação

router.get('/fundamentos', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/fundamentos.html'));
});

//router from linguagens de programação

router.get('/ltp', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/ltp.html'));
});

//router from montagaem e manutenção

router.get('/manutencao', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/manutencao.html'));
});

//router from redes

router.get('/redes', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/redes.html'));
});

//router from sistemas

router.get('/sistemas', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/sistemas.html'))
})

//router from novas postagens 

router.get('/postar', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/postagens.html'))
})

//router from posts

router.get('/viewpost', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/posts.html'))
})


//router from update page

router.get('/atualizar', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/update.html'))
})


//router from update posts

router.post('/posts/:id', async (req, res) => {

    const id = Number(req.params.id)

    const postagem = req.body

    postagem.Cod_Post = id

    if(id && postagem) {
        const updatePost = await Postagem.upsert(postagem);
        res.json(updatePost);
        if (updatePost) {
            res.sendFile(path.join(__dirname, '../public/posts.html'))
        }
    } else {
        throw new HTTPError('Invalid update post', 400);
    }
});

//router from postagem infos

router.post('/newpost', async (req, res) => {
    const postagem = req.body
    console.log(postagem)

    const newPostagem = await Postagem.create(postagem);

    if (newPostagem) {
        res.sendFile(path.join(__dirname, '../public/posts.html'))
    } else {
        throw new HTTPError('Invalid data to create postagem, 400')
    }
});

//router view postagens

router.get('/getposts', async (req, res, next) => {
    try {
        const postagens = await Postagem.readAll();
        console.log(postagens)
        res.json(postagens)
    } catch(e) {
        next(e)
    }
});

//router from delete postagens

router.delete('/posts/:Cod_Post', async (req, res) => {
    const Cod_Post = req.params.Cod_Post

    if(Cod_Post && await Postagem.remove((Cod_Post))){
        res.sendStatus(204);
    } else {
        throw new HTTPError('Cod_Post is required to remove Postagem', 400);
    }
});

// router from usuario infos

router.post('/usuario', async (req, res) => {

    
    const usuario = req.body;

    console.log(usuario)

    const newUsuario = await Usuario.create(usuario);

    if (newUsuario) {
        res.sendFile(path.join(__dirname, '../public/init.html'));
    } else {
        throw new HTTPError('Invalid data to create usuario', 400);
   } 
});

//router view usuarios

router.get('/usuario', async (req, res) => {
    const usuario = await Usuario.readAll();

    res.json(usuario);
});

//router update usuario

router.put('/usuario/:id', async (req, res) => {
    const id = Number(req.params.id);
    const usuario = req.body;

    if (id && usuario) {
        const newUsuario = await Usuario.update(usuario, id);

        res.json(newUsuario);
    } else {
      throw new HTTPError('Invalid data to update usuario', 400);
    }
});

//router from delete usuario

router.delete('/usuario/:id', async (req, res) => {
    const id = req.params.id;

    if (id && (await Usuario.remove(id))) {
        res.sendStatus(204);
    } else {
        throw new HTTPError('Id is required to remove usuario',400);
    }
});

// 404 handler
router.use((req, res, next) => {
    res.status(404).json({message: 'Content not found!'});
});

// Error hundler
router.use((err, req, res, next) => {
    console.error(err);
    if (err instanceof HTTPError) {
        res.status(err.code).json({ message: err.message });
    } else {
        res.status(500).json({ message:'Something broke!' });
    }
});

export default router;