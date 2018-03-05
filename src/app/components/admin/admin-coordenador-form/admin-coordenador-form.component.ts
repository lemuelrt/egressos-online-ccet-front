import { AdminComponent } from './../admin.component';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-admin-coordenador-form',
  templateUrl: './admin-coordenador-form.component.html',
  styleUrls: ['./admin-coordenador-form.component.css']
})
export class AdminCoordenadorFormComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  numberPattern = /^[0-9]*$/;

  adminForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // o Curso como vai ser feito fiquei em dúvida
    this.adminForm = this.formBuilder.group({
      cpf: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      nome: this.formBuilder.control('', [Validators.required]),
      senha: this.formBuilder.control('', [Validators.required]),
      confirmarSenha: this.formBuilder.control('', [Validators.required]),
      status: this.formBuilder.control('', [Validators.required]),
      oferta: this.formBuilder.control('', [Validators.required]),
    }, { validator: AdminCoordenadorFormComponent.equalsTo });
  }

  // Verificando se as senhas são iguais // Validator personalizado

  // tslint:disable-next-line:member-ordering
  static equalsTo(group: AbstractControl): { [key: string]: boolean } {

    const senha = group.get('senha');
    const confirmarSenha = group.get('confirmarSenha');

    if (!senha || !confirmarSenha) {
      return undefined;
    }

    if (senha.value !== confirmarSenha.value) {
      return { senhasNaoConferem: true };

      // senhaNaoConferem é o nome da chave para retornar a msg de erro Caso as senhas não conferem
    }

    return undefined;
  }

  salvar() {
    console.log('teste');
  }
}
