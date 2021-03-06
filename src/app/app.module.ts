import { AuthModule } from './components/auth/auth.module';
import { EgressoModule } from './components/egresso/egresso.module';
import { AppErrorHandle } from './app-error-handle';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { LOCALE_ID } from '@angular/core';

import { AdminModule } from './components/admin/admin.module';
import { CoordModule } from './components/coord/coord.module';
import { AppComponent } from './app.component';
import { CoordComponent } from './components/coord/coord.component';
// tslint:disable-next-line:max-line-length
import { CoordAtuacaoProfissionalFormComponent } from './components/coord/coord-atuacao-profissional-form/coord-atuacao-profissional-form.component';
// tslint:disable-next-line:max-line-length
import { CoordAtuacoesProfissionaisImportComponent } from './components/coord/coord-atuacoes-profissionais-import/coord-atuacoes-profissionais-import.component';
// tslint:disable-next-line:max-line-length
import { CoordAtuacaoProfissionalIndexComponent } from './components/coord/coord-atuacao-profissional-index/coord-atuacao-profissional-index.component';
import { CoordEgressoFormComponent } from './components/coord/coord-egresso-form/coord-egresso-form.component';
import { CoordEgressosImportComponent } from './components/coord/coord-egressos-import/coord-egressos-import.component';
import { CoordEgressoIndexComponent } from './components/coord/coord-egresso-index/coord-egresso-index.component';
import { AdminComponent } from './components/admin/admin.component';
import { SharedModule } from './components/shared/shared.module';


import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    CoordModule,
    SharedModule,
    EgressoModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyALTRQfVSXeAVJfH8A__FmN1Rh38C68-Z4',
      libraries: ['places'],
      language: 'pt-br'
    }),
    AppRoutingModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandle},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
