import { TipoUsuario } from './../enums/tipo-usuario.enum';
import { AuthService } from './../services/auth.service';

import { Observable } from 'rxjs/Observable';
import { Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, CanActivateChild } from '@angular/router/src/interfaces';


export abstract class BaseGuard implements CanLoad, CanActivate, CanActivateChild {

  protected authService: AuthService;
  protected tipoUsuario: TipoUsuario;

  constructor(
    authService: AuthService,
    tipoUsuario: TipoUsuario
  ) {

    this.authService = authService;
    this.tipoUsuario = tipoUsuario;
  }

  checkLoggIn(): boolean {
    return this.authService.isLoggedIn();
  }

  checkPermission(): boolean {
    return this.authService.isLoggedIn(this.tipoUsuario);
  }

  checkAuthentication(path: string) {

    if (this.checkLoggIn()) {
      return this.checkPermission();
    } else {
      this.authService.handleLogin(this.tipoUsuario);
    }
  }

  canLoad(route: Route): boolean {
    return this.checkAuthentication(route.path);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuthentication(route.routeConfig.path);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuthentication(childRoute.routeConfig.path);
  }
}
