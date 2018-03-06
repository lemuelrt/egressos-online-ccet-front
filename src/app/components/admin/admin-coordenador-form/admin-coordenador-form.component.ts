import { OfertaService } from './../../../services/oferta.service';
import { Oferta } from './../../../models/oferta.model';
import { ValidationService } from './../../../services/validation.service';
import { AdminComponent } from './../admin.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-admin-coordenador-form',
  templateUrl: './admin-coordenador-form.component.html',
  styleUrls: ['./admin-coordenador-form.component.css']
})
export class AdminCoordenadorFormComponent implements OnInit, AfterViewInit {

  adminForm: FormGroup;

  ofertas: Oferta[] = [];

  ofertaSelecionada: Oferta;

  constructor(
    private formBuilder: FormBuilder,
    private _ofertaService: OfertaService
  ) { }

  ngOnInit() {

    this._ofertaService.getAll().subscribe(
      (ofertas) => {
        this.ofertas = ofertas;
        console.log(ofertas);
      }

    );

    // o Curso como vai ser feito fiquei em dúvida
    this.adminForm = this.formBuilder.group({
      cpf: this.formBuilder.control('', [Validators.required, ValidationService.CPFValidator]),
      email: this.formBuilder.control('', [Validators.required, ValidationService.emailValidator]),
      nome: this.formBuilder.control('', [Validators.required]),
      senha: this.formBuilder.control('', [Validators.required]),
      confirmarSenha: this.formBuilder.control('', [Validators.required]),
      status: this.formBuilder.control('', [Validators.required]),
      oferta: this.formBuilder.control('', [Validators.required]),
    });


  }

  ngAfterViewInit() {
    this.equalsTo(this.adminForm.controls.confirmarSenha, this.adminForm.controls.senha);
    this.equalsTo(this.adminForm.controls.senha, this.adminForm.controls.confirmarSenha, true);
  }

  equalsTo(senha1: AbstractControl, senha2: AbstractControl, touched = false) {
    senha1.valueChanges.subscribe(
      (selectedValue) => {
        const testar = (touched === false || (touched && senha2.touched)) ? true : false;
        if (testar && senha2.value !== selectedValue) {
          senha1.setErrors({ 'senhasNaoConferem': true });
          senha2.setErrors({ 'senhasNaoConferem': true });
        } else {
          senha1.setErrors(null);
          senha2.setErrors(null);
        }
      }
    );
  }

  salvar() {
    console.log(this.ofertaSelecionada);
  }
}
