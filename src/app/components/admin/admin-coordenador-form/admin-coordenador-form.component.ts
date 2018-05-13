import { MESSAGES } from './../../../const/messages';
import { CoordenadorService } from './../../../services/coordenador.service';
import { Coordenador } from './../../../models/coordenador.model';
import { OfertaService } from './../../../services/oferta.service';
import { Oferta } from './../../../models/oferta.model';
import { ValidationService } from './../../../services/validation.service';
import { AdminComponent } from './../admin.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-admin-coordenador-form',
  templateUrl: './admin-coordenador-form.component.html',
  styleUrls: ['./admin-coordenador-form.component.css']
})
export class AdminCoordenadorFormComponent implements OnInit, AfterViewInit {

  adminForm: FormGroup;

  ofertas: Oferta[] = [];

  coordenador: Coordenador = null;

  title = 'Cadastro de coordenador';
  btndescricao = 'Cadastrar';

  constructor(
    private formBuilder: FormBuilder,
    private ofertaService: OfertaService,
    private toastr: ToastrService,
    private coordenadorService: CoordenadorService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.ofertaService.getAll().subscribe(
      (ofertas) => {
        this.ofertas = ofertas;

      }
    );

    const id = this.route.snapshot.params['id'];

    // o Curso como vai ser feito fiquei em dúvida
    this.adminForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, ValidationService.emailValidator]),
      cpf: this.formBuilder.control('', [Validators.required, ValidationService.CPFValidator]),
      nome: this.formBuilder.control('', [Validators.required, ValidationService.nomeCompleto]),
      senha: this.formBuilder.control('', [Validators.required, ValidationService.senha]),
      confirmarSenha: this.formBuilder.control('', [Validators.required]),
      oferta: this.formBuilder.control('', [ValidationService.selectedValidator]),
    });

    if (id !== undefined) {
      this.title = 'Alteração de coordenador';
      this.btndescricao = 'Alterar';

      this.coordenadorService.getByid(id).subscribe(
        coordenador => {
          this.coordenador = coordenador;

          this.adminForm.get('cpf').setValue('' + this.coordenador.coordenadorCpf);
          this.adminForm.get('cpf').disable();

          this.adminForm.get('nome').setValue(this.coordenador.coordenadorNome);
          this.adminForm.get('email').setValue(this.coordenador.coordenadorEmail);
          if (this.coordenador.coordenadorOferta) {
            this.adminForm.get('oferta').setValue(this.coordenador.coordenadorOferta.ofertaId);
          }


          this.adminForm.controls.senha.clearValidators();
          this.adminForm.controls.senha.setValidators([ValidationService.senha]);
          this.adminForm.controls.senha.updateValueAndValidity();
          this.adminForm.controls.confirmarSenha.clearValidators();
          this.adminForm.controls.confirmarSenha.setValidators([ValidationService.senha]);
          this.adminForm.controls.confirmarSenha.updateValueAndValidity();
        },
        (error) => {
          this.toastr.error(`O coordenador não foi encontrado.`);
          this.router.navigate(['/admin/coordenadores']);
        });
    }

  }

  ngAfterViewInit() {
    this.equalsTo(this.adminForm.controls.confirmarSenha, this.adminForm.controls.senha, true);
    this.equalsTo(this.adminForm.controls.senha, this.adminForm.controls.confirmarSenha, true);
  }

  equalsTo(senha1: AbstractControl, senha2: AbstractControl, touched = false) {
    senha1.valueChanges.subscribe(
      (selectedValue) => {
        const testar = (touched === false || (touched && senha2.touched)) ? true : false;
        if (testar && senha2.value !== selectedValue) {
          if (senha1.valid) {
            senha1.setErrors({ 'senhasNaoConferem': true });
          }
          if (senha2.valid) {
            senha2.setErrors({ 'senhasNaoConferem': true });
          }
        } else {
          if (senha1.hasError('senhasNaoConferem')) {
            senha1.setErrors(null);
          }
          if (senha2.hasError('senhasNaoConferem')) {
            senha2.setErrors(null);
          }
        }
      }
    );
  }

  saveOrUpdate() {

    if (this.adminForm.invalid) {
      Object.keys(this.adminForm.controls).forEach(field => {
        const control = this.adminForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });

      this.toastr.error(MESSAGES['M008']);
    } else {
      this.spinner.show();
      const ofertaSeleciona: Oferta = this.ofertas.find((o) => o.ofertaId.toString() === this.adminForm.get('oferta').value);

      const coordenador: Coordenador = {
        coordenadorCpf: this.adminForm.controls.cpf.value,
        coordenadorSenha: this.adminForm.controls.senha.value,
        coordenadorNome: this.adminForm.controls.nome.value,
        coordenadorStatus: 1,
        coordenadorEmail: this.adminForm.controls.email.value,
        coordenadorOferta: ofertaSeleciona
      };



      if (this.coordenador === null) {
        this.coordenadorService.save(coordenador)
        .finally(() => this.spinner.hide())
        .subscribe(
          (coordenadorResponse) => {

            this.toastr.success(MESSAGES['M013']);
            this.router.navigate(['/admin/coordenadores']);
          }
        );
      } else {
        this.coordenadorService.update(
          this.coordenador.coordenadorId, coordenador)
          .finally(() => this.spinner.hide())
          .subscribe(
          (coordenadorResponse) => {

            this.toastr.success(MESSAGES['M014']);
            this.router.navigate(['/admin/coordenadores']);
          }
        );
      }
    }
  }
}
