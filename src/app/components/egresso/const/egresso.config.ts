 // tslint:disable-next-line:max-line-length
import { ConsultaDistribuicaoGeograficaComponent } from './../../shared/consultas/consulta-distribuicao-geografica/consulta-distribuicao-geografica.component';
import { EgressoAtualizarFormComponent } from './../egresso-atualizar-form/egresso-atualizar-form.component';
import { Routes } from '@angular/router';
import { EgressoIndexComponent } from './../egresso-index/egresso-index.component';
import { EgressoComponent } from './../egresso.component';

export const egresso_routes: Routes = [
  {
    path: 'egresso', component: EgressoComponent, /*data: {title: 'Home'},*/ children: [
      { path: '', component: EgressoIndexComponent },
      { path: 'atualizar', component: EgressoAtualizarFormComponent },
      { path: 'consulta/distribuicao-geografica', component: ConsultaDistribuicaoGeograficaComponent },
    ]
  },
];
