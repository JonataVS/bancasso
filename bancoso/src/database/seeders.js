// transporte de dados

import { dados } from './dados.js';
import Usuario from '../models/Usuario.js';
import Recebe from  '../models/Recebe.js';
import Disciplinas from '../models/Disciplinas.js';
import Administrador from '../models/Administrador.js';
import Aluno from '../models/Aluno.js';

async function up() {
    
    for (const usuario of dados.usuarios) {
        await Usuario.create(usuario);
    }

    for (const disciplina of dados.disciplinas) {
        await Disciplinas.create(disciplina);
    }
    
    for (const receber of dados.recebe) {
        await Recebe.create(receber);
    }

    for (const administrador of dados.administrador) {
        await Administrador.create(administrador);
    }

    for (const aluno of dados.alunos) {
        await Aluno.create(aluno);
    }
    
}

export default { up };