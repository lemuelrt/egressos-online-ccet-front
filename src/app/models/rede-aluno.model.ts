import { RedeSocial } from './rede-social.model';
import { Aluno } from './aluno.model';

export interface RedeAluno {
  redeAlunoId: string;
  aluno: Aluno;
  redeSocial: RedeSocial;
  redeAlunoLink: string;
}
