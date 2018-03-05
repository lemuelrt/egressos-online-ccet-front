import { ValidationService } from './../../../services/validation.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.css']
})
export class ControlMessagesComponent {

  @Input() control: FormControl;

  constructor() { }

  get errorMessage() {

    for (const propertyName in this.control.errors) {

      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }


    }

    return null;
  }
}
