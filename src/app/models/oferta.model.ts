import { Coordenador } from './coordenador.model';
import { Curso } from './curso.model';
import { Campus } from './campus.model';

export interface Oferta {
    ofertaId?: number;
    ofertaCampus: Campus;
    ofertaCurso: Curso;
    coordenador?: Coordenador;
}
