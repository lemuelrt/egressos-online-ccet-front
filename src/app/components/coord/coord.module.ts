import { AuthCoordGuard } from './../../guards/auth-coord.guard';
import { CoordAuthModule } from './coord-auth/coord-auth.module';

import { coord_routes } from './../coord/const/coord.config';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordComponent } from './coord.component';
// import { CoordEgressosComponent } from './coord-egressos-import/coord-egressos-import.component';
import { CoordIndexComponent } from './coord-index/coord-index.component';
import { CoordEgressoFormComponent } from './coord-egresso-form/coord-egresso-form.component';
import { CoordAtuacaoProfissionalFormComponent } from './coord-atuacao-profissional-form/coord-atuacao-profissional-form.component';
import { CoordAtuacaoProfissionalIndexComponent } from './coord-atuacao-profissional-index/coord-atuacao-profissional-index.component';
// tslint:disable-next-line:max-line-length
import { CoordAtuacoesProfissionaisImportComponent } from './coord-atuacoes-profissionais-import/coord-atuacoes-profissionais-import.component';
import { CoordEgressoIndexComponent } from './coord-egresso-index/coord-egresso-index.component';
import { CoordEgressosImportComponent } from './coord-egressos-import/coord-egressos-import.component';
import { AtuacaoProfissionalService } from '../../services/atuacao-profissional.service';
import { EgressoService } from '../../services/egresso.service';
import { LeftPadPipe } from 'ngx-pipes';
import { CoordAuthComponent } from './coord-auth/coord-auth.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(coord_routes),
    SharedModule,
    CoordAuthModule
  ],
  declarations: [
    CoordComponent,
    CoordAtuacaoProfissionalFormComponent,
    CoordAtuacaoProfissionalIndexComponent,
    CoordAtuacoesProfissionaisImportComponent,
    CoordEgressoFormComponent,
    CoordEgressoIndexComponent,
    CoordEgressosImportComponent,
    CoordIndexComponent
  ],
  providers: [
    AtuacaoProfissionalService,
    EgressoService,
    LeftPadPipe,
    AuthCoordGuard
  ],
  exports: [
    CoordAuthModule
  ]
})
export class CoordModule { }
