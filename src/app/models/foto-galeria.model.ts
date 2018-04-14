import { Aluno } from './aluno.model';


export interface FotoGaleria {
  fotoGaleriaId: string;
  fotoGaleriaLink: string;
  fotoGaleriaDescricao: string;
  aluno: Aluno;
}
