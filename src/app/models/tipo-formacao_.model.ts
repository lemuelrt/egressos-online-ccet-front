import { Titulacao } from './titulacao.model';
import { Egresso } from './egresso.model';


export interface TipoFormacao {

  tipoFormacaoId: string;
  titulacao: Titulacao;
  egresso: Egresso;
  tipoFormacaoAnoConclusao: number;
  tipoFormacaoArea: string;
  tipoFormacaoInstituicao: string;
}
