/* insert info

import Database from '../database/database.js';

async function create(disciplinas) {
    const db = await Database.connect();

    const {id_disciplina, name} = disciplinas;

    const sql = `
     INSERT INTO
        disciplinas (id_disciplina, name)
     VALUES
      (?, ?)
  `
     
    const { lastID } = await db.run(sql, [id_disciplina, name]);
 
    return read(lastID);
}

async function read(id) {
    const db = await Database.connect();

    const sql = `
     SELECT
       *
     FROM
        disciplinas
     WHERE
       id_disciplina = ?
    `;

    const disciplinas= await db.get(sql, [id]);

    return disciplinas;
}

export default { create, read };*/