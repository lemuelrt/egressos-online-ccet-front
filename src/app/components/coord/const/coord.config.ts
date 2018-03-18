
import { CoordAtuacaoProfissionalFormComponent } from './../coord-atuacao-profissional-form/coord-atuacao-profissional-form.component';
import { CoordAtuacaoProfissionalIndexComponent } from './../coord-atuacao-profissional-index/coord-atuacao-profissional-index.component';
// tslint:disable-next-line:max-line-length
import { CoordAtuacoesProfissionaisImportComponent } from './../coord-atuacoes-profissionais-import/coord-atuacoes-profissionais-import.component';
import { CoordEgressoFormComponent } from './../coord-egresso-form/coord-egresso-form.component';
import { CoordEgressoIndexComponent } from './../coord-egresso-index/coord-egresso-index.component';
import { CoordEgressosImportComponent } from './../coord-egressos-import/coord-egressos-import.component';
import { CoordComponent } from './../coord.component';
import { Routes } from '@angular/router';
import { CoordIndexComponent } from '../coord-index/coord-index.component';

export const coordLteConfig = {
  skin: 'blue',
  sidebarLeftMenu: [
    // { label: 'Atuacões profissionais', route: '/coord/atuacoes-profissionais', iconClasses: 'fa fa-user' },

  ]
};

/*COMO CRIAMOS UM coordLteConfig para os egressos?*/

/*DEPOIS VAMOS CONFERIR SE O MAPEAMENTO DAS ROTAS ESTÁ OK*/
export const coord_routes: Routes = [
  {
    path: 'coord', component: CoordComponent, /*data: {title: 'Home'},*/ children: [
      { path: '', component: CoordIndexComponent },
      { path: 'atuacoes-profissionais', component: CoordAtuacaoProfissionalIndexComponent/*, data: { title: 'Atuações profissionais' } */ },
      { path: 'atuacoes-profissionais-add', component: CoordAtuacaoProfissionalFormComponent },
      { path: 'atuacoes-profissionais-edit/:id', component: CoordAtuacaoProfissionalFormComponent },
    ]
  },
];
