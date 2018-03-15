import { MaterialModule } from './angular-material/angular-material.module';
import { CoordenadorService } from './../../services/coordenador.service';
import { ToastrModule } from 'ngx-toastr';
import { OfertaService } from './../../services/oferta.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from './../../services/validation.service';
import { NgModule,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      closeButton: true
    }),
    MaterialModule
  ],
  declarations: [ControlMessagesComponent, DialogConfirmationComponent],
  providers: [
    ValidationService,
    OfertaService,
    CoordenadorService
  ],
  entryComponents: [
    DialogConfirmationComponent,
  ],
  exports: [
    DialogConfirmationComponent,
    ControlMessagesComponent,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgPipesModule
  ]
})
export class SharedModule { }
