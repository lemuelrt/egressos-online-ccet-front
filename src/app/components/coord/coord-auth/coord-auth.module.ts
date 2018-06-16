import { coord_auth_routes } from './const/coord-auth.config';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordAuthComponent } from './coord-auth.component';
import { SharedModule } from '../../shared/shared.module';
import { CoordAuthForgotComponent } from './coord-auth-forgot/coord-auth-forgot.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(coord_auth_routes),
    SharedModule
  ],
  declarations: [
    CoordAuthComponent,
    CoordAuthForgotComponent
  ]
})
export class CoordAuthModule { }
