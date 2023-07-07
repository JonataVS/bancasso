// insert info

import prisma from '../database/index.js';

async function create(postagem) {
  const newPostagem = await prisma.postagem.create({
    data: postagem
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

async function remove(Cod_Post) {
  const removePostagem = await prisma.postagem.remove({
    where: {
      Cod_Post
    }
  });

  return removePostagem
};

//

async function readAll() {
  const readAllPostagem = await prisma.postagem.findMany({
    
  });

  return readAllPostagem
}

//


export default {
  create,
  read,
  update,
  remove,
  readAll
};