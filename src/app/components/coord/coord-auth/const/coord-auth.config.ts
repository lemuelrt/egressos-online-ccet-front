import { CoordAuthForgotComponent } from './../coord-auth-forgot/coord-auth-forgot.component';
import { CoordAuthComponent } from './../coord-auth.component';
import { Routes } from '@angular/router';



export const coord_auth_routes: Routes = [
  { path: 'coord/auth', component: CoordAuthComponent },
  { path: 'coord/forgot', component: CoordAuthForgotComponent },
];
