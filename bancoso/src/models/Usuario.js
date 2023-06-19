// insert info

import Database from '../database/database.js';

async function create(usuario) {
    const db = await Database.connect();

    const {nome, email, senha, sexo, tipo} = usuario;

    const sql = `
     INSERT INTO
       usuario (name, email, senha, sexo, tipo)
     VALUES
        (?, ?, ?, ?, ?)
    ;`;

    const { lastID } = await db.run(sql, [nome, email, senha, sexo, tipo]);

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
