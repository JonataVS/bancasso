// insert info

import Database from '../database/database.js';

async function create(alunos) {
    const db = await Database.connect();

    const {id_usuario, nome, email, senha, sexo, tipo} = alunos;

    const sql = `
     INSERT INTO
       alunos (id_usuario, name, email, senha, sexo, tipo)
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
        alunos
     WHERE
       id_usuario = ?
    `;

    const alunos = await db.get(sql, [id]);

    return alunos;
}

export default { create, read };
