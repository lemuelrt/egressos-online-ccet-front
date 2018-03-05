import { ValidationService } from './../../services/validation.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlMessagesComponent } from './control-messages/control-messages.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ControlMessagesComponent],
  providers: [ValidationService],
  exports: [
    ControlMessagesComponent
  ]
})
export class SharedModule { }
