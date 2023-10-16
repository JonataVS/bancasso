// import de rotas e pacotes

import { Router } from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import 'dotenv/config';
import Usuario from './models/Usuario.js';
import Postagem from './models/Postagem.js';

import { validate } from './middleware/validate.js'
import { isAuthenticated } from './middleware/auth.js';
import SendMail from './services/SendMail.js';

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const saltRounds = Number(process.env.SALT_ROUNDS);

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
  res.sendFile(path.join(__dirname, '../public/init.html'));
});

//router from login

router.get('/entrar', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/login.html'));
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
  res.sendFile(path.join(__dirname, '../public/sistemas.html'));
});

//router from novas postagens

router.get('/postar', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/postagens.html'));
});

//router from posts

router.get('/viewpost', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/posts.html'));
});

//router from update page

router.get('/atualizar', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/update.html'));
});

//router from update posts

router.post('/posts/:id', isAuthenticated, async (req, res) => {
  const id = Number(req.params.id);

  const postagem = req.body;

  postagem.Cod_Post = id;

  if (id && postagem) {
    const updatePost = await Postagem.upsert(postagem);
    const updatePage = res.redirect('/viewpost');

    res.json(updatePost, updatePage);
  } else {
    throw new HTTPError('Invalid update post', 400);
  }
});

//router from postagem infos

router.post(
  '/newpost',
   isAuthenticated, async (req, res) => {
    const usuarioId = req.usuarioId;
    const postagem = req.body;
    postagem.usuarioId = usuarioId;
    console.log(postagem);

    const newPostagem = await Postagem.create(postagem);

    await SendMail.createNewPost(newPostagem.usuario.email);

    if (newPostagem) {
      res.json({ newPostagem });
    } else {
      throw new HTTPError('Invalid data to create postagem, 400');
    }
  }
);

//router view postagens

router.get(
  '/getposts',
   isAuthenticated, async (req, res, next) => {
    const usuarioId = req.usuarioId;

    console.log(usuarioId);

    const postagem = await Postagem.readAll(usuarioId);

    res.json(postagem);
    //console.log(postagens);
  }
);

//router from delete postagens

router.delete(
  '/posts/:id',
   isAuthenticated, async (req, res) => {
    const id = Number(req.params.id);
    Postagem.Cod_Post = id;

    if (id && (await Postagem.remove(id))) {
      res.sendStatus(204);
    } else {
      throw new HTTPError('Cod_Post is required to remove Postagem', 400);
    }
  }
);

// router from usuario infos

router.post('/usuario',
validate(
  z.object({
    body: z.object({
      nome: z.string(),
      email: z.string().email(),
      senha: z.string().min(8),
    }),
  })
),
 async (req, res) => {
  const usuario = req.body;

  console.log(usuario);

  const hash = await bcrypt.hash(usuario.senha, saltRounds);

  usuario.senha = hash;

  const newUsuario = await Usuario.create(usuario);

  await SendMail.createNewUser(newUsuario.email);

  res.redirect('/entrar');
});

//router signin

router.post('/login'
, async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await Usuario.readByEmail(email);

    const { id: usuarioId, senha: hash } = user;

    const match = await bcrypt.compare(senha, hash);

    if (match) {
      const token = jwt.sign({ usuarioId }, process.env.JWT_SECRET, {
        expiresIn: 3600,
      });

      res.json({ auth: true, token });
    } else {
      throw new Error('Token não encontrado');
    }
  } catch (error) {
    res.status(401).json({ error: 'Usuario não existe' });
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
  const id = Number(req.params.id);

  if (id && (await Usuario.remove(id))) {
    res.sendStatus(204);
  } else {
    throw new HTTPError('Id is required to remove usuario', 400);
  }
});

// 404 handler
router.use((req, res, next) => {
  res.status(404).json({ message: 'Content not found!' });
});

// Error hundler
router.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof HTTPError) {
    res.status(err.code).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Something broke!' });
  }
});

export default router;
