import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { adminLteConfig } from './config/admin-lte.config';
import { LayoutModule } from 'angular-admin-lte';

import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { AdminComponent } from './admin.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule.forRoot(adminLteConfig),
  ],
  declarations: [
    AdminComponent
  ],
  providers: [

  ]
})
export class AdminModule { }
