import { Oferta } from './oferta.model';
export interface Coordenador {

  coordenadorCpf: number;
  coordenadorNome: string;
  coordenadorEmail: string;
  coordenadorStatus: number;
  coordenadorOferta: Oferta;

}
