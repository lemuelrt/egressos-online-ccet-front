import { ToastrModule } from 'ngx-toastr';
import { OfertaService } from './../../services/oferta.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from './../../services/validation.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      closeButton: true
    })
  ],
  declarations: [ControlMessagesComponent],
  providers: [ValidationService, OfertaService],
  exports: [
    ControlMessagesComponent,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule
  ]
})
export class SharedModule { }
