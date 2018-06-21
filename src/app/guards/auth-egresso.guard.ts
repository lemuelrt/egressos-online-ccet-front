import { TipoUsuario } from './../enums/tipo-usuario.enum';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { BaseGuard } from './base.guard';

@Injectable()
export class AuthEgressoGuard extends BaseGuard {

  constructor(
    authService: AuthService
  ) {
    super(authService, TipoUsuario.EGRESSO);
  }

}
