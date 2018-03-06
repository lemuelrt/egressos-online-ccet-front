import { Oferta } from './oferta.model';
export interface Coordenador {

  coordenadirId?: number;
  coordenadorCpf: number;
  coordenadorSenha?: string;
  coordenadorNome: string;
  coordenadorEmail: string;
  coordenadorStatus: number;

}
