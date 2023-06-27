// import de rotas e pacotes 

import { Router } from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import Usuario from './models/Usuario.js';
// import Recebe from './models/Recebe.js';
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
})


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

// router from usuario infos

router.post('/usuario', async (req, res) => {
    const usuario = req.body;

    console.log(usuario)

    const newUsuario = await Usuario.create(usuario);

    if (newUsuario) {
        res.sendFile(path.join(__dirname, '../public/init.html'));
    } else {
        throw new HTTPError('Invalid data to create usuario, 400 ')
   } 
});

router.get('/usuario', async (req, res) => {
    const usuario = await Usuario.readAll();

    res.json(usuario);
});

router.put('/usuario/:id', async (req, res) => {
    const id = Number(req.params.id);

    const usuario = req.body;

    if (id && usuario) {
        const newUsuario = await Usuario.update(usuario, id);

        res.json(newUsuario);
    } else {
      throw new HTTPError('Invalid data to update usuario, 400');
    }
});

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
    //console.error(err.stack);
    if (err instanceof HTTPError) {
        res.status(err.code).json({ message: err.message });
    } else {
        res.status(500).json({ message:'Something broke!' });
    }
});

export default router;