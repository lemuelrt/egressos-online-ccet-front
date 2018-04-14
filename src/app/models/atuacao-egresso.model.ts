import { FaixaSalarial } from './faixa-salarial.model';
import { Egresso } from './egresso.model';
import { AtuacaoProfissional } from './atuacao-profissional.model';
export interface AtuacaoEgresso {
  atuacaoEgressoId: string;
  egresso: Egresso;
  atuacaoProfissional: AtuacaoProfissional;
  atuacaoEgressoPais: string;
  atuacaoEgressoEstado: string;
  atuacaoEgressoCidade: string;
  atuacaoEgressoSetor: number;
  faixaSalarial: FaixaSalarial;
  atuacaoEgressoHomeOffice: number;
}
