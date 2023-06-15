import { Router } from 'express';
import Usuario from './models/Usuario.js';
import Recebe from './models/Recebe.js';
import Disciplinas from './models/Disciplinas.js';

class HTTPError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

const router = Router();

router.post('/usuario', async (req, res) => {
    const usuario = req.body;

    const newUsuario = await Usuario.create(usuario);

    if (newUsuario) {
        res.json(newUsuario);
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

    const = usuario = req.body;

    if (id && usuario) {
        const newUsuario = await Usuario.update(usuario, id);

        res.json(newUsuario);
    } else {
      throw new HTTPError('Invalid data to update usuario, 400');
    }
});

//as rotas ainda não foram finalizadas, continue...