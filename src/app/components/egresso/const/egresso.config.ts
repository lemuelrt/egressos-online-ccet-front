import { Routes } from '@angular/router';
import { EgressoIndexComponent } from './../egresso-index/egresso-index.component';
import { EgressoComponent } from './../egresso.component';



export const egresso_routes: Routes = [
  {
    path: 'egresso', component: EgressoComponent, /*data: {title: 'Home'},*/ children: [
      { path: '', component: EgressoIndexComponent },
    ]
  },
];
