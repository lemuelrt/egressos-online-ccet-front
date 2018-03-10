import { AdminCoordenadorFormComponent } from './../admin-coordenador-form/admin-coordenador-form.component';
import { AdminCoordenadoresComponent } from './../admin-coordenadores/admin-coordenadores.component';
import { AdminIndexComponent } from './../admin-index/admin-index.component';
import { AdminComponent } from './../admin.component';
import { Routes } from '@angular/router';

export const adminLteConfig = {
  skin: 'blue',
  sidebarLeftMenu: [
    // { label: 'Coordenadores', route: '/admin/coordenadores', iconClasses: 'fa fa-user' },

  ]
};

export const routes_admin: Routes = [
  {
    path: 'admin', component: AdminComponent, /*data: {title: 'Home'},*/ children: [
      { path: '', component: AdminIndexComponent },
      { path: 'coordenadores', component: AdminCoordenadoresComponent/*, data: { title: 'Coordenadores' } */ },
      { path: 'coordenadores-add', component: AdminCoordenadorFormComponent },
      { path: 'coordenadores-edit/:cpf', component: AdminCoordenadorFormComponent },
    ]
  },
];
