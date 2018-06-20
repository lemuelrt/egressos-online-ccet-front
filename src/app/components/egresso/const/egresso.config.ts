// tslint:disable-next-line:max-line-length
import { ConsultaAtuacaoProfissionalComponent } from './../../shared/consultas/consulta-atuacao-profissional/consulta-atuacao-profissional.component';
// tslint:disable-next-line:max-line-length
import { ConsultaDistribuicaoGeograficaComponent } from './../../shared/consultas/consulta-distribuicao-geografica/consulta-distribuicao-geografica.component';
import { ConsultaFaixaSalarialComponent } from '../../shared/consultas/consulta-faixa-salarial/consulta-faixa-salarial.component';
import { EgressoAtualizarFormComponent } from './../egresso-atualizar-form/egresso-atualizar-form.component';
import { Routes } from '@angular/router';
import { EgressoIndexComponent } from './../egresso-index/egresso-index.component';
import { EgressoComponent } from './../egresso.component';
// tslint:disable-next-line:max-line-length
import { ConsultaFormacaoAcademicaComponent } from '../../shared/consultas/consulta-formacao-academica/consulta-formacao-academica.component';
import { AuthEgressoGuard } from '../../../guards/auth-egresso.guard';


export const egresso_routes: Routes = [
  {
    path: 'egresso', component: EgressoComponent, /*data: {title: 'Home'},*/
    canLoad: [AuthEgressoGuard],
    canActivate: [AuthEgressoGuard],
    canActivateChild: [AuthEgressoGuard],

    children: [
      { path: '', component: EgressoIndexComponent },
      { path: 'atualizar', component: EgressoAtualizarFormComponent },
      { path: 'consulta/distribuicao-geografica', component: ConsultaDistribuicaoGeograficaComponent },
      { path: 'consulta/faixa-salarial', component: ConsultaFaixaSalarialComponent },
      { path: 'consulta/atuacao-profissional', component: ConsultaAtuacaoProfissionalComponent },
      { path: 'consulta/formacao-academica', component: ConsultaFormacaoAcademicaComponent }
    ]
  },
];
