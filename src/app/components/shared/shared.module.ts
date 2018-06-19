import { AuthInterceptorProvider } from './../../interceptors/auth.interceptor';
import { StorageService } from './../../services/storage.service';
import { AuthService } from './../../services/auth.service';
import { ConsultaAtuacaoProfissionalService } from './../../services/consulta-atuacao-profissional.service';
import { ConsultaAtuacaoProfissionalComponent } from './consultas/consulta-atuacao-profissional/consulta-atuacao-profissional.component';
import { ConsultaDistribuicaoGeograficaService } from './../../services/consulta-distribuicao-geografica.service';
import { ConsultaFormacaoAcademicaService } from './../../services/consulta-formacao-academica.service';
import { ConsultaFormacaoAcademicaComponent } from './consultas/consulta-formacao-academica/consulta-formacao-academica.component';
import { AtuacaoProfissionalService } from './../../services/atuacao-profissional.service';
import { FaixaSalarialService } from './../../services/faixa-salarial.service';
import { RedeSocialService } from './../../services/rede-social.service';
import { NgxMaskModule } from 'ngx-mask';
import { LayoutModule, BoxModule } from 'angular-admin-lte';
import { appLteConfig } from './../../const/app-lte.config';
import { MaterialModule } from './angular-material/angular-material.module';
import { CoordenadorService } from './../../services/coordenador.service';
import { ToastrModule } from 'ngx-toastr';
import { OfertaService } from './../../services/oferta.service';
import { ValidationService } from './../../services/validation.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { NgPipesModule } from 'ngx-pipes';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { LayoutFooterComponent } from './layout-footer/layout-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PapaParseModule } from 'ngx-papaparse';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TitulacaoService } from '../../services/titulacao.service';
// tslint:disable-next-line:max-line-length
import { ConsultaDistribuicaoGeograficaComponent } from './consultas/consulta-distribuicao-geografica/consulta-distribuicao-geografica.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { ConsultaFaixaSalarialComponent } from './consultas/consulta-faixa-salarial/consulta-faixa-salarial.component';
import { ConsultaFaixaSalarialService } from '../../services/consulta-faixa-salarial.service';

@NgModule({
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      closeButton: true
    }),
    MaterialModule,
    LayoutModule.forRoot(appLteConfig),
    BoxModule,
    NgxMaskModule.forRoot(),
    PapaParseModule,
    NgxSpinnerModule,
    NgSelectModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    ControlMessagesComponent,
    DialogConfirmationComponent,
    LayoutHeaderComponent,
    LayoutFooterComponent,
    ConsultaDistribuicaoGeograficaComponent,
    ConsultaFaixaSalarialComponent,
    ConsultaAtuacaoProfissionalComponent,
    ConsultaFormacaoAcademicaComponent
  ],
  providers: [
    ValidationService,
    OfertaService,
    CoordenadorService,
    RedeSocialService,
    FaixaSalarialService,
    AtuacaoProfissionalService,
    TitulacaoService,
    AuthService,
    StorageService,
    ConsultaDistribuicaoGeograficaService,
    ConsultaFaixaSalarialService,
    ConsultaAtuacaoProfissionalService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    AuthInterceptorProvider,
    ConsultaFormacaoAcademicaService
  ],
  entryComponents: [
    DialogConfirmationComponent,
  ],
  exports: [
    DialogConfirmationComponent,
    ControlMessagesComponent,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgPipesModule,
    NgSelectModule,
    LayoutModule,
    BoxModule,
    LayoutHeaderComponent,
    LayoutFooterComponent,
    NgxMaskModule,
    NgxSpinnerModule,
    ConsultaDistribuicaoGeograficaComponent,
    ConsultaFaixaSalarialComponent,
    ConsultaAtuacaoProfissionalComponent,
    ConsultaFormacaoAcademicaComponent
  ]
})
export class SharedModule { }
