import Database from '../database/database.js';

async function create(recebe) {
    const db = await Database.connect();

    const {id_usuario, id_disciplina} = recebe;

    const sql = `
     INSERT INTO
       recebe (id_usuario, id_disciplina)
     VALUES
        (?, ?)
    `;

    const { lastID } = await db.run(sql, [id_usuario, id_disciplina]);

    return read(lastID);
}

async function read(id) {
    const db = await Database.connect();

    const sql = `
     SELECT
       *
     FROM
        recebe
     WHERE
       id_usuario = ?
    `;

    const recebe = await db.get(sql, [id]);

    return recebe;
}

export default { create, read };
