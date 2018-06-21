import { AuthAdminGuard } from './../../guards/auth-admin.guard';
import { routes_admin } from './const/admin.config';
import { Routes, RouterModule } from '@angular/router';
import { OfertaService } from './../../services/oferta.service';
import { SharedModule } from './../shared/shared.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { AdminCoordenadoresComponent } from './admin-coordenadores/admin-coordenadores.component';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { AdminCoordenadorFormComponent } from './admin-coordenador-form/admin-coordenador-form.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminAuthModule } from './admin-auth/admin-auth.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes_admin),
    AdminAuthModule,
    SharedModule
  ],
  declarations: [
    AdminComponent,
    AdminCoordenadoresComponent,
    AdminIndexComponent,
    AdminCoordenadorFormComponent
  ],
  providers: [
    AuthAdminGuard
  ]
})
export class AdminModule { }
