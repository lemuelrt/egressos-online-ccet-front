import { Router } from '@angular/router';
import { UsuarioDto } from './../models/usuario-dto.model';
import { LocalUser } from './../models/local-user.model';
import { TipoUsuario } from './../enums/tipo-usuario.enum';
import { EOCCET_API, EOCCET_BASE_API } from './../app.api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router
  ) { }

  isLoggedIn(tipoUsuario?: TipoUsuario): boolean {

    const localUser = this.storage.getLocalUser();

    if (localUser && localUser.usuario.tipoUsuario !== undefined &&
      (tipoUsuario === undefined || tipoUsuario === localUser.usuario.tipoUsuario)) {
      return true;
    }

    return false;
  }

  getAuthenticated(): UsuarioDto {

    const localUser = this.storage.getLocalUser();

    if (localUser.usuario !== undefined) {
      return localUser.usuario;
    }
    return undefined;
  }

  authenticate(usuario: string, senha: string, tipoUsuario: TipoUsuario, ofertaId: number) {
    return this.http.post(
      `${EOCCET_BASE_API}/login`,
      { username: usuario, password: senha, tipoUsuario: tipoUsuario, ofertaId: ofertaId },
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  forgot(email: string, tipoUsuario: TipoUsuario): Observable<any> {
    return this.http.post<any>(`${EOCCET_API}/auth/forgot`, { email: email, tipoUsuario: tipoUsuario });
  }

  refreshToken() {
    return this.http.post(
      `${EOCCET_API}/auth/refresh_token`,
      {},
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  successfulLogin(authorizationValue: string, usuario: UsuarioDto) {
    const tok = authorizationValue.substring(7);
    const user: LocalUser = {
      token: tok,
      usuario: usuario
    };
    this.storage.setLocalUser(user);

    this.redirectSuccessfulLogin(usuario.tipoUsuario);
  }

  redirectSuccessfulLogin(tipoUsuario: TipoUsuario) {
    switch (tipoUsuario) {
      case TipoUsuario.ADMIN:
        this.router.navigate(['/admin']);
        break;
      case TipoUsuario.COORD:
        this.router.navigate(['/coord']);
        break;
      default:
        this.router.navigate(['']);
        break;
    }
  }

  private setUser(): Observable<boolean> {
    return this.http.get<any>(`${EOCCET_API}/auth/usuario`)
      .do((data) => {
        this.storage.setUserInLocalUser(data);
      });
  }

  handleLogin(tipoUsuario: TipoUsuario) {
    this.storage.setLocalUser(null);
    switch (tipoUsuario) {
      case TipoUsuario.ADMIN:
        this.router.navigate(['/admin/auth']);
        break;
      case TipoUsuario.COORD:
        this.router.navigate(['/coord/auth']);
        break;
      default:
        this.router.navigate(['/auth']);
        break;
    }
  }

  logout(tipoUsuario: TipoUsuario) {
    this.handleLogin(tipoUsuario);
  }
}
