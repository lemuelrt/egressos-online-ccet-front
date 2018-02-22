import { Oferta } from './oferta.model';
export interface Coordenador {

  coordenadirId?: number;
  coordenadorCpf: number;
  coordenadorNome: string;
  coordenadorEmail: string;
  coordenadorStatus: number;
  coordenadorOferta: Oferta;

}
