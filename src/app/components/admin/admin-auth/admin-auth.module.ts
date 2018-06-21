import { AdminAuthComponent } from './admin-auth.component';
import { admin_auth_routes } from './const/admin-auth.config';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(admin_auth_routes),
    SharedModule
  ],
  declarations: [
    AdminAuthComponent
  ]
})
export class AdminAuthModule { }
