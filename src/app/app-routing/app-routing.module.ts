import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/egresso', pathMatch: 'full' },
  { path: 'admin', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'coord', redirectTo: '/coord', pathMatch: 'full' },
  { path: 'egresso', redirectTo: '/egresso', pathMatch: 'full' },
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
