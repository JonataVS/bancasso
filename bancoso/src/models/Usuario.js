// insert info

import Database from '../database/database.js';

async function create(usuario) {
    const db = await Database.connect();

    const {id_usuario, name, email, senha, sexo} = usuario;

    const sql = `
     INSERT INTO
       usuario (id_usuario, name, email, senha, sexo)
     VALUES
        (?, ?, ?, ?, ?)
    `;

    const { lastID } = await db.run(sql, [id_usuario, name, email, senha, sexo]);

    return read(lastID);
}

async function read(id) {
    const db = await Database.connect();

    const sql = `
     SELECT
       *
     FROM
        usuario
     WHERE
       id_usuario = ?
    `;

    const usuario = await db.get(sql, [id]);

    return usuario;
}

export default { create, read };
