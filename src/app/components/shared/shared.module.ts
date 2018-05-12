import { ConsultaDistribuicaoGeograficaService } from './../../services/consulta-distribuicao-geografica.service';
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
import { NgModule } from '@angular/core';
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
import { ConsultaFaixaSalarialComponent } from './consultas/consulta-faixa-salarial/consulta-faixa-salarial.component';

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
    NgxSpinnerModule
  ],
  declarations: [
    ControlMessagesComponent,
    DialogConfirmationComponent,
    LayoutHeaderComponent,
    LayoutFooterComponent,
    ConsultaDistribuicaoGeograficaComponent,
    ConsultaFaixaSalarialComponent
  ],
  providers: [
    ValidationService,
    OfertaService,
    CoordenadorService,
    RedeSocialService,
    FaixaSalarialService,
    AtuacaoProfissionalService,
    TitulacaoService,
    ConsultaDistribuicaoGeograficaService
  ],
  entryComponents: [
    DialogConfirmationComponent,
  ],
  exports: [
    DialogConfirmationComponent,
    ControlMessagesComponent,
    LayoutHeaderComponent,
    LayoutFooterComponent,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgPipesModule,
    LayoutModule,
    BoxModule,
    NgxMaskModule,
    NgxSpinnerModule,
    ConsultaDistribuicaoGeograficaComponent,
    ConsultaFaixaSalarialComponent
  ]
})
export class SharedModule { }
