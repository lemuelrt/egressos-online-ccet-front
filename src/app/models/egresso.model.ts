import { Aluno } from './aluno.model';


export interface Egresso {
  egressoNome: Aluno;
  egressoCpf: Aluno;
  anoIngresso: number;
  anoConclusao: number;
}
