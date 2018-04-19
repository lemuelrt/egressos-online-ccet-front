import { TipoFormacao } from './tipo-formacao_.model';
import { Titulacao } from './titulacao.model';
import { AtuacaoEgresso } from './atuacao-egresso.model';
import { Oferta } from './oferta.model';
import { Aluno } from './aluno.model';


export class Egresso {
  egressoId?: number;
  egressoAnoIngresso: string;
  egressoAnoConclusao: string;
  aluno: Aluno;
  oferta?: Oferta;
  EgressoDataAtualizacao?: string;
  tiposFormacao?: TipoFormacao[];
  atuacoesProfissional?: AtuacaoEgresso[];
}
