import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { adminLteConfig } from './admin-lte.config';
import { LayoutModule } from 'angular-admin-lte';


@NgModule({
  imports: [
    CommonModule,
    LayoutModule.forRoot(adminLteConfig),
  ],
  declarations: []
})
export class AdminModule { }
