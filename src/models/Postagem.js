// insert info

import prisma from '../database/index.js';


async function create(postagem) {
  const newPostagem = await prisma.postagem.create({
    data: postagem,
    include: {
      usuario: true,
      usuario: {
        select: {
          id: true,

        },
      },
    },

  });

  return newPostagem
};

//

async function read(Cod_Post) {
  const postagem = await prisma.postagem.findUnique({
    where: {
      Cod_Post
    }
  });

  return postagem
};

//

async function update(postagem, Cod_Post) {
  const updatePostagem = await prisma.postagem.update({
    where: {
      Cod_Post,
    },
    data: postagem
  });

  return updatePostagem
}

//

async function upsert(Postagem) {
  const upsertPostagem = await prisma.postagem.upsert({
    where: {
      Cod_Post: Postagem.Cod_Post,
    },
    update: {
      titulo: Postagem.titulo,
      conteudo: Postagem.conteudo,
    },
    create: {
      titulo: Postagem.titulo,
      conteudo: Postagem.conteudo
    },
  })

  return upsertPostagem
}

//

async function readOne(Cod_Post) {
  const postagem = await prisma.postagem.findUnique({
    where: { Cod_Post }
  });

  return postagem
}

//

async function remove(Cod_Post) {
  const removePostagem = await prisma.postagem.delete({
    where: {
      Cod_Post,
    }
  });

  return removePostagem
};

//

async function readAll(usuarioId) {
  const readAllPostagem = await prisma.postagem.findMany({
    where: {usuarioId},
  });

  return readAllPostagem
}

//


export default {
  create,
  read,
  update,
  upsert,
  remove,
  readAll,
  readOne,
};