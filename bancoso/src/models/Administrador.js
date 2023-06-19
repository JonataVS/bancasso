// insert info

import Database from '../database/database.js';

async function create(administrador) {
    const db = await Database.connect();

    const {id_usuario, nome, email, senha, sexo, tipo} = administrador;

    const sql = `
     INSERT INTO
       administrador (id_usuario, name, email, senha, sexo, tipo)
     VALUES
        (?, ?, ?, ?, ?, ?)
    ;`;

    const { lastID } = await db.run(sql, [id_usuario, nome, email, senha, sexo, tipo]);

    return read(lastID);
}

async function read(id) {
    const db = await Database.connect();

    const sql = `
     SELECT
       *
     FROM
        administrador
     WHERE
       id_usuario = ?
    `;

    const administrador = await db.get(sql, [id]);

    return administrador;
}

export default { create, read };
