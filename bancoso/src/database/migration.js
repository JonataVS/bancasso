// create tables

import Database from './database.js';

async function up() {
   const db = await Database.connect();

   const usuarioSql = `
     CREATE TABLE usuario (
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR (20) NOT NULL, 
        email VARCHAR (40) NOT NULL,
        senha VARCHAR (10) NOT NULL,
        sexo INTEGER,
        tipo INTEGER 
     )
     `;

   await db.run(usuarioSql);

   const disciplinaSql = `
     CREATE TABLE disciplinas (
        id_disciplina INTEGER PRIMARY KEY,
        name VARCHAR(20) NOT NULL      
     )
     `
   await db.run(disciplinaSql);

   const recebeSql = `
     CREATE TABLE recebe (
        id_usuario INTEGER NOT NULL REFERENCES usuario (id_usuario),
        id_disciplina INTEGER NOT NULL REFERENCES disciplinas (id_disciplina)
     )
     `;

   await db.run(recebeSql);

}

export default { up };