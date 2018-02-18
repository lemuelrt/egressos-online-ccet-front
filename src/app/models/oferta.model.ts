import { Curso } from './curso.model';
import { Campus } from './campus.model';

export interface Oferta {
    campus: Campus;
    curso: Curso;
}
