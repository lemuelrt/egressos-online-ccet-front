import { Titulacao } from './titulacao.model';
import { AtuacaoEgresso } from './atuacao-egresso.model';
import { Oferta } from './oferta.model';
import { Aluno } from './aluno.model';


export interface Egresso {
  egressoId?: number;
  egressoAnoIngresso: string;
  egressoAnoConclusao: string;
  aluno: Aluno;
  oferta?: Oferta;
  EgressoDataAtualizacao?: string;
  titulacoes?: Titulacao[];
  atuacoesProfissional?: AtuacaoEgresso[];
}
