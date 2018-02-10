import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './../admin.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, children: [
      // { path: '', component:  },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, /* { enableTracing: true } */)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
