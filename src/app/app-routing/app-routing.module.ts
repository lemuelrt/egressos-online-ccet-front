import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router/src/config';
import { RouterModule } from '@angular/router/src/router_module';

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },

  // { path: '**', component: NotFoundComponent },
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
export class AppRoutingModule { }
