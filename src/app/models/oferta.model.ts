import { Curso } from './curso.model';
import { Campus } from './campus.model';

export interface Oferta {
    ofertaCampus: Campus;
    ofertaCurso: Curso;
}