import { AuthCoordGuard } from './../../../guards/auth-coord.guard';
import { CoordAuthComponent } from './../coord-auth/coord-auth.component';
// tslint:disable-next-line:max-line-length
import { ConsultaAtuacaoProfissionalComponent } from './../../shared/consultas/consulta-atuacao-profissional/consulta-atuacao-profissional.component';
// tslint:disable-next-line:max-line-length
import { ConsultaDistribuicaoGeograficaComponent } from './../../shared/consultas/consulta-distribuicao-geografica/consulta-distribuicao-geografica.component';
import { CoordAtuacaoProfissionalFormComponent } from './../coord-atuacao-profissional-form/coord-atuacao-profissional-form.component';
import { CoordAtuacaoProfissionalIndexComponent } from './../coord-atuacao-profissional-index/coord-atuacao-profissional-index.component';
// tslint:disable-next-line:max-line-length

import { CoordEgressoFormComponent } from './../coord-egresso-form/coord-egresso-form.component';
import { CoordEgressoIndexComponent } from './../coord-egresso-index/coord-egresso-index.component';
import { CoordEgressosImportComponent } from './../coord-egressos-import/coord-egressos-import.component';
import { CoordComponent } from './../coord.component';
import { Routes } from '@angular/router';
import { CoordIndexComponent } from '../coord-index/coord-index.component';
import { ConsultaFaixaSalarialComponent } from '../../shared/consultas/consulta-faixa-salarial/consulta-faixa-salarial.component';
// tslint:disable-next-line:max-line-length
import { ConsultaFormacaoAcademicaComponent } from '../../shared/consultas/consulta-formacao-academica/consulta-formacao-academica.component';
// tslint:disable-next-line:max-line-length
import { ConsultaEstatisticasDoSistemaComponent } from '../../shared/consultas/consulta-estatisticas-do-sistema/consulta-estatisticas-do-sistema.component';


export const coord_routes: Routes = [
  {
    path: 'coord',
    component: CoordComponent, /*data: {title: 'Home'},*/
    canLoad: [AuthCoordGuard],
    canActivate: [AuthCoordGuard],
    canActivateChild: [AuthCoordGuard],
    children: [
      { path: '', component: CoordIndexComponent },
      { path: 'atuacoes-profissionais', component: CoordAtuacaoProfissionalIndexComponent/*, data: { title: 'Atuações profissionais' } */ },
      { path: 'atuacoes-profissionais-add', component: CoordAtuacaoProfissionalFormComponent },
      { path: 'atuacoes-profissionais-edit/:id', component: CoordAtuacaoProfissionalFormComponent },
      { path: 'egressos', component: CoordEgressoIndexComponent },
      { path: 'egressos-add', component: CoordEgressoFormComponent },
      { path: 'egressos-edit/:id', component: CoordEgressoFormComponent },
      { path: 'egressos-import', component: CoordEgressosImportComponent },
      { path: 'consulta/distribuicao-geografica', component: ConsultaDistribuicaoGeograficaComponent },
      { path: 'consulta/faixa-salarial', component: ConsultaFaixaSalarialComponent },
      { path: 'consulta/atuacao-profissional', component: ConsultaAtuacaoProfissionalComponent },
      { path: 'consulta/formacao-academica', component: ConsultaFormacaoAcademicaComponent },
      { path: 'consulta/estatisticas-do-sistema', component: ConsultaEstatisticasDoSistemaComponent }
    ]
  },
];
