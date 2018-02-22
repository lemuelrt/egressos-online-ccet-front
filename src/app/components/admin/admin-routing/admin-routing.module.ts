import { AdminIndexComponent } from './../admin-index/admin-index.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './../admin.component';
import { AdminCoordenadoresComponent } from './../admin-coordenadores/admin-coordenadores.component';
import { AdminCoordenadorFormComponent } from '../admin-coordenador-form/admin-coordenador-form.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, /*data: {title: 'Home'},*/ children: [
      { path: '', component: AdminIndexComponent },
      { path: 'coordenadores/add', component: AdminCoordenadorFormComponent/*, data: { title: 'Coordenadores' } */ },
      { path: 'coordenadores', component: AdminCoordenadoresComponent/*, data: { title: 'Coordenadores' } */},

    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
