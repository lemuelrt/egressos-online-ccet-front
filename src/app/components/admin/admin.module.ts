import { AppErrorHandle } from './../../app-error-handle';
import { OfertaService } from './../../services/oferta.service';
import { SharedModule } from './../shared/shared.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import { adminLteConfig } from './config/admin-lte.config';
import { LayoutModule, BoxModule } from 'angular-admin-lte';

import { NgxMaskModule } from 'ngx-mask';

import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminCoordenadoresComponent } from './admin-coordenadores/admin-coordenadores.component';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { AdminCoordenadorFormComponent } from './admin-coordenador-form/admin-coordenador-form.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
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
