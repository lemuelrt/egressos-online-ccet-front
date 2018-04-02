import { Aluno } from './aluno.model';


export interface Egresso {
  egressoid?: number;
  egressoAnoIngresso: number;
  egressoAnoConclusao: number;
  aluno: Aluno;
}
