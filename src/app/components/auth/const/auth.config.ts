import { AuthLoginComponent } from './../auth-login/auth-login.component';
import { Routes } from '@angular/router';
import { Component } from '@angular/core';


export const auth_routes: Routes = [
  {
    path: 'login', component: AuthLoginComponent,
  }
];
