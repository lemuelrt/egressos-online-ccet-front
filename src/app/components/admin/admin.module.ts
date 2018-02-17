import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { adminLteConfig } from './config/admin-lte.config';
import { LayoutModule, BoxModule } from 'angular-admin-lte';

import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminCoordenadoresComponent } from './admin-coordenadores/admin-coordenadores.component';
import { AdminIndexComponent } from './admin-index/admin-index.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule.forRoot(adminLteConfig),
    BoxModule
  ],
  declarations: [
    AdminComponent,
    AdminCoordenadoresComponent,
    AdminIndexComponent
  ],
  providers: [

  ]
})
export class AdminModule { }
