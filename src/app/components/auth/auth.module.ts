import { RouterModule } from '@angular/router';
import { auth_routes } from './const/auth.config';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from './auth-login/auth-login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(auth_routes),
    SharedModule
  ],
  declarations: [AuthLoginComponent]
})
export class AuthModule { }
