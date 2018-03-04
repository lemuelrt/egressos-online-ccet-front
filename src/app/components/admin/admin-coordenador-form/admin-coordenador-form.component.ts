import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-admin-coordenador-form',
  templateUrl: './admin-coordenador-form.component.html',
  styleUrls: ['./admin-coordenador-form.component.css']
})
export class AdminCoordenadorFormComponent implements OnInit {

  adminForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.adminForm = this.formBuilder.group({
      cpf: this.formBuilder.control(''),
      email: this.formBuilder.control(''),
      nome: this.formBuilder.control(''),
      senha: this.formBuilder.control(''),
      confirmarSenha: this.formBuilder.control(''),
      status: this.formBuilder.control('')
    });
  }

}
