// insert info

import prisma from '../database/index.js';

//

async function create(usuario) {
   const newUsuario = await prisma.usuario.create({
     data: usuario
    });

    return newUsuario
};

//

async function read(id) {
  const usuario = await prisma.usuario.findUnique({
    where: {
      id,
    },
  });

  return usuario; 
};

//

async function update(usuario, id) {
  const updateUsuario = await prisma.usuario.update({
    where: {
      id,
    },
    data: usuario
  });

  return updateUsuario;
};

//

async function remove(id) {
  const removeUsuario = await prisma.usuario.remove({
    where: {
      id,
    },
  });

  return removeUsuario

};

//

export default {
  create,
  read,
  update,
  remove,
};