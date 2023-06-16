// transporte de dados

import { dados } from './dados.js';
import Usuario from '../models/Usuario.js';
import Recebe from  '../models/Recebe.js';
import Disciplinas from '../models/Disciplinas.js';

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
    
}

export default { up };