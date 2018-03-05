import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { adminLteConfig } from './config/admin-lte.config';
import { LayoutModule, BoxModule } from 'angular-admin-lte';

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
    ReactiveFormsModule
  ],
  declarations: [
    AdminComponent,
    AdminCoordenadoresComponent,
    AdminIndexComponent,
    AdminCoordenadorFormComponent
  ],
  providers: [

  ]
})
export class AdminModule { }
