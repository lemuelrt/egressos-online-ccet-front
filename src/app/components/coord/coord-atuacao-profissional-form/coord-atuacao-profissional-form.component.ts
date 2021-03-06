import { MESSAGES } from './../../../const/messages';
import { AtuacaoProfissionalService } from './../../../services/atuacao-profissional.service';
import { ValidationService } from './../../../services/validation.service';
import { CoordComponent } from './../coord.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AtuacaoProfissional } from '../../../models/atuacao-profissional.model';
import { NgxSpinnerService } from 'ngx-spinner';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-coord-atuacao-profissional-form',
  templateUrl: './coord-atuacao-profissional-form.component.html',
  styleUrls: ['./coord-atuacao-profissional-form.component.css']
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
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.params['id'];

    this.coordForm = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required, ValidationService.nomeAtuacaoProfissionalCompleto])
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

      this.toastr.error(MESSAGES['M006']);
    } else {
      this.spinner.show();
      const atuacaoProfissional: AtuacaoProfissional = {
        atuacaoProfissionalNome: this.coordForm.controls.nome.value,
        atuacaoProfissionalStatus: 1
      };


      if (this.atuacaoProfissional === null) {
        this.atuacaoProfissionalService.save(atuacaoProfissional)
        .finally(() => this.spinner.hide())
        .subscribe(
          (coordenadorResponse) => {

            this.toastr.success(MESSAGES['M014']);
            this.router.navigate(['/coord/atuacoes-profissionais']);
          }
        );
      } else {
          this.atuacaoProfissionalService.update(
          this.atuacaoProfissional.atuacaoProfissionalId, atuacaoProfissional)
          .finally(() => this.spinner.hide())
          .subscribe(
          (atuacaoProfissionalResponse) => {

            this.toastr.success(MESSAGES['M015']);
            this.router.navigate(['/coord/atuacoes-profissionais']);
          }
        );
      }
    }
  }
}

