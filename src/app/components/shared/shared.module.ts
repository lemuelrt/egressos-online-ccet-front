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

@NgModule({
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      closeButton: true
    })
  ],
  declarations: [ControlMessagesComponent],
  providers: [
    ValidationService,
    OfertaService,
    CoordenadorService
  ],
  exports: [
    ControlMessagesComponent,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
