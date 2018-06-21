import { EgressoAuthForgotComponent } from './egresso-forgot/egresso-auth-forgot.component';
import { RouterModule } from '@angular/router';
import { egresso_auth_routes } from './const/egresso-auth.config';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EgressoAuthComponent } from './egresso-auth.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(egresso_auth_routes),
    SharedModule,
  ],
  declarations: [
    EgressoAuthComponent,
    EgressoAuthForgotComponent
  ]
})
export class EgressoAuthModule { }
