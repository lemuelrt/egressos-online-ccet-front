import { Oferta } from './../../../models/oferta.model';
import { TipoUsuario } from './../../../enums/tipo-usuario.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { OfertaService } from '../../../services/oferta.service';
import { MESSAGES } from '../../../const/messages';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-egresso-auth',
  templateUrl: './egresso-auth.component.html',
  styleUrls: ['./egresso-auth.component.css']
})
export class EgressoAuthComponent implements OnInit {

  senha_hide = true;
  loginForm: FormGroup;

  ofertas: Oferta[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private ofertaService: OfertaService,
    private spinner: NgxSpinnerService,
  ) {
    if (this.authService.isLoggedIn(TipoUsuario.EGRESSO)) {
      this.router.navigate(['egresso']);
    }

  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      cpf: this.formBuilder.control('', [Validators.required]),
      senha: this.formBuilder.control('', [Validators.required]),
      oferta: this.formBuilder.control('', [ValidationService.selectedValidator])
    });

    this.ofertaService.getAll().subscribe(
      (ofertas) => {
        this.ofertas = ofertas;
      }
    );
  }

  hasError(name: string): boolean {
    return this.loginForm.get(name).errors && this.loginForm.get(name).touched;
  }

  getControl(name: string): AbstractControl {
    return this.loginForm.get(name);
  }

  login() {

    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });

      this.toastr.error(MESSAGES['M006']);

    } else {
      this.spinner.show();
      this.authService.authenticate(
        this.loginForm.get('cpf').value,
        this.loginForm.get('senha').value,
        TipoUsuario.EGRESSO,
        this.loginForm.get('oferta').value)
        .finally(() => this.spinner.hide())
        .subscribe(
          (response) => {
            this.toastr.success(MESSAGES['M001']);
            this.authService.successfulLogin(response.headers.get('Authorization'), JSON.parse(response.body));
          },
          (error) => {
            this.toastr.error(MESSAGES['M002']);
          }
        );
    }

  }

}
