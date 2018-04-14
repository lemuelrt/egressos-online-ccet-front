import { Egresso } from './egresso.model';
import { RedeAluno } from './rede-aluno.model';
import { FotoGaleria } from './foto-galeria.model';
export interface Aluno {
  alunoId?: number;
  alunoNome: string;
  alunoCpf: string;
  alunoEmail?: string;
  alunoPais?: string;
  alunoEstado?: string;
  alunoCidade?: string;
  alunoQtdFilhos?: number;
  alunoSenha?: string;
  alunoTelefone?: number;
  alunoFotoPerfil?: string;
  alunoEstadoCivil?: number;
  redesAluno?: RedeAluno[];
  fotos?: FotoGaleria[];
}
