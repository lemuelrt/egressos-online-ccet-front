import { Oferta } from './oferta.model';
export interface Coordenador {

  coordenadorId?: number;
  coordenadorCpf: number;
  coordenadorSenha?: string;
  coordenadorNome: string;
  coordenadorEmail: string;
  coordenadorStatus?: number;
  coordenadorOferta?: Oferta;
}
