import { MESSAGES } from './../../../const/messages';
import { AtuacaoProfissionalService } from './../../../services/atuacao-profissional.service';
import { ValidationService } from './../../../services/validation.service';
import { CoordComponent } from './../coord.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AtuacaoProfissional } from '../../../models/atuacao-profissional.model';

@Component({
  selector: 'app-admin-coordenador-form',
  templateUrl: './admin-coordenador-form.component.html',
  styleUrls: ['./admin-coordenador-form.component.css']
})
export class CoordAtuacaoProfissionalFormComponent implements OnInit, AfterViewInit {

  coordForm: FormGroup;

  atuacaoProfissional: AtuacaoProfissional = null;

  title = 'Cadastro de atuação profissional';
  btndescricao = 'Cadastrar';

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private atuacaoProfissionalService: AtuacaoProfissionalService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.params['id'];

    // o Curso como vai ser feito fiquei em dúvida
    this.coordForm = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required, ValidationService.nomeCompleto]),
    });

    if (id !== undefined) {
      this.title = 'Alteração de atuação profissional';
      this.btndescricao = 'Alterar';

      this.atuacaoProfissionalService.getByid(id).subscribe(
        atuacaoProfissional => {
          this.atuacaoProfissional = atuacaoProfissional;

          this.coordForm.get('nome').setValue(this.atuacaoProfissional.atuacaoProfissionalNome);
        },
        (error) => {
          this.toastr.error(`A atuação profissional não foi encontrada.`);
          this.router.navigate(['/coord/atuacoes-profissionais']);
        });
    }

  }

  ngAfterViewInit() {
  }


  saveOrUpdate() {

    if (this.coordForm.invalid) {
      Object.keys(this.coordForm.controls).forEach(field => {
        const control = this.coordForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });

      this.toastr.error(MESSAGES['M011']);
    } else {
      const ofertaSeleciona: Oferta = this.ofertas.find((o) => o.ofertaId.toString() === this.adminForm.get('oferta').value);

      const coordenador: Coordenador = {
        coordenadorCpf: this.adminForm.controls.cpf.value,
        coordenadorSenha: this.adminForm.controls.senha.value,
        coordenadorNome: this.adminForm.controls.nome.value,
        coordenadorStatus: 1,
        coordenadorEmail: this.adminForm.controls.email.value,
        coordenadorOferta: ofertaSeleciona
      };

      // console.log(coordenador);

      if (this.coordenador === null) {
        this.coordenadorService.save(coordenador).subscribe(
          (coordenadorResponse) => {
            // console.log(coordenadorResponse);
            this.toastr.success(MESSAGES['M013']);
            this.router.navigate(['/admin/coordenadores']);
          }
        );
      } else {
        this.coordenadorService.update(this.coordenador.coordenadorId, coordenador).subscribe(
          (coordenadorResponse) => {
            // console.log(coordenadorResponse);
            this.toastr.success(MESSAGES['M014']);
            this.router.navigate(['/admin/coordenadores']);
          }
        );
      }
    }
  }
}

