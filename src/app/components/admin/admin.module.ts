import { routes_admin, adminLteConfig } from './const/admin.config';
import { Routes, RouterModule } from '@angular/router';
import { AppErrorHandle } from './../../app-error-handle';
import { OfertaService } from './../../services/oferta.service';
import { SharedModule } from './../shared/shared.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule, BoxModule } from 'angular-admin-lte';

import { NgxMaskModule } from 'ngx-mask';

import { AdminComponent } from './admin.component';
import { AdminCoordenadoresComponent } from './admin-coordenadores/admin-coordenadores.component';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { AdminCoordenadorFormComponent } from './admin-coordenador-form/admin-coordenador-form.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes_admin),
    LayoutModule.forRoot(adminLteConfig),
    BoxModule,
    FormsModule,
    SharedModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    AdminComponent,
    AdminCoordenadoresComponent,
    AdminIndexComponent,
    AdminCoordenadorFormComponent
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandle },
  ]
})
export class AdminModule { }
