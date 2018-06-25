import { TipoUsuario } from './../enums/tipo-usuario.enum';

export interface UsuarioDto {

  id: number;
  tipoUsuario: TipoUsuario;
  nome?: string;
  email?: string;
  ofertaId?: number;
  fotoPerfil?: string;
  tempoMinimoIntegralizacao?: number;
}
