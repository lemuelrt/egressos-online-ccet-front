import { TipoFormacao } from './tipo-formacao.model';
import { Egresso } from './egresso.model';


export interface Titulacao {

  titulacaoId: string;
  tipoFormacao: TipoFormacao;
  egresso: Egresso;
  titulacaoAnoConclusao: number;
  titulacaoArea: string;
}
