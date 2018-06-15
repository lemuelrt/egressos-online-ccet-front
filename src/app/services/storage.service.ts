import { STORAGE_KEYS } from './../const/storage-keys.config';
import { LocalUser } from './../models/local-user.model';
import { Injectable } from '@angular/core';
import { UsuarioDto } from '../models/usuario-dto.model';

@Injectable()
export class StorageService {

  getLocalUser(): LocalUser {
    const usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if (usr == null) {
      return null;
    } else {
      return JSON.parse(usr);
    }
  }

  setLocalUser(obj: LocalUser) {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
  }

  setUserInLocalUser(obj: UsuarioDto) {
    const localUser = this.getLocalUser();

    if (localUser !== null) {
      const newLocalUser: LocalUser = {
        token: localUser.token,
        usuario: obj
      };

      this.setLocalUser(newLocalUser);
    }
  }

}
