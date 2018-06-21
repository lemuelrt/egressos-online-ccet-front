import { EgressoAuthForgotComponent } from './../egresso-forgot/egresso-auth-forgot.component';
import { EgressoAuthComponent } from './../egresso-auth.component';



import { Routes } from '@angular/router';

export const egresso_auth_routes: Routes = [
  { path: 'auth', component: EgressoAuthComponent },
  { path: 'forgot', component: EgressoAuthForgotComponent },
];
