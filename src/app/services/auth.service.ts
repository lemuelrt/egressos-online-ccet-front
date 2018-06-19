import { UsuarioDto } from './../models/usuario-dto.model';
import { LocalUser } from './../models/local-user.model';
import { TipoUsuario } from './../enums/tipo-usuario.enum';
import { EOCCET_API, EOCCET_BASE_API } from './../app.api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  isLoggedIn(tipoUsuario?: TipoUsuario): boolean {

    const localUser = this.storage.getLocalUser();

    if (localUser && (tipoUsuario === undefined || tipoUsuario === localUser.usuario.tipoUsuario)) {
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
    return this.http.post<any>(`${EOCCET_API}/auth/forgot`, {email: email, tipoUsuario: tipoUsuario});
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

  successfulLogin(authorizationValue: string) {
    const tok = authorizationValue.substring(7);
    const user: LocalUser = {
      token: tok,
      usuario: undefined
    };
    this.storage.setLocalUser(user);
    this.setUser();
  }

  private setUser() {
    this.http.get<UsuarioDto>(`${EOCCET_API}/auth/usuario`).subscribe(
      (usuario => {
        this.storage.setUserInLocalUser(usuario);
      })
    );
  }

  logout() {
    this.storage.setLocalUser(null);
  }
}
