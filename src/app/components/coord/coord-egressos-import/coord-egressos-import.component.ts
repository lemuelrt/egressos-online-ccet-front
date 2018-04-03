import { Router } from '@angular/router';
import { EgressoService } from './../../../services/egresso.service';
import { ValidationService } from './../../../services/validation.service';
import { Egresso } from './../../../models/egresso.model';
import { Aluno } from './../../../models/aluno.model';
import { MESSAGES } from './../../../const/messages';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-coord-egressos-import',
  templateUrl: './coord-egressos-import.component.html',
  styleUrls: ['./coord-egressos-import.component.css']
})
export class CoordEgressosImportComponent implements OnInit {


  title = 'Cadastrar egressos por importação';
  btnDescricao = 'Cadastrar';

  egressoImportGroup: FormGroup;

  controls: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private egressoService: EgressoService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  egressosImportado: Egresso[];  // buscar na service de egresso o objeto retornado do arquivo csv

  egressosForm: Egresso[];

  ngOnInit() {
    if (this.egressoService.egressosImportados.length === 0) {
      this.router.navigate(['/coord/egressos']);
    }

    this.egressosImportado = this.egressoService.egressosImportados;

    this.egressoImportGroup = this.formBuilder.group({
      egressos: this.formBuilder.array([])
    });
    this.controls = <FormArray>this.egressoImportGroup.controls['egressos'];

    this.prepareEgressosFormGroup();

    this.egressoImportGroup.markAsTouched();

  }

  saveAll(egressos: Egresso[]) {

    if (this.egressoImportGroup.invalid) {
      Object.keys(this.egressoImportGroup.controls).forEach(field => {
        const control = this.egressoImportGroup.get(field);
        control.markAsTouched({ onlySelf: false });
      });

      this.toastr.error(MESSAGES['M008']);

    } else {

      for (let i = 1; i < egressos.length; i++) {
          this.egressosForm.push({
            egressoAnoIngresso: egressos[i][2],
            egressoAnoConclusao: egressos[i][3],
            aluno: {
              alunoNome: egressos[i][0],
              alunoCpf: egressos[i][1]
            }
          });
        }
      }



      if (this.egressosForm === null) {
        this.egressoService.saveAll(egressos).subscribe(
          (egressosResponse) => {

            this.toastr.success(MESSAGES['M022']);
            this.router.navigate(['/coord/egressos']);
          }
        );
      }

  }


  prepareEgressosFormGroup() {

    this.egressosImportado.forEach((egresso) => {
      const group = this.formBuilder.group({
        'nome': this.formBuilder.control(egresso.aluno.alunoNome, [Validators.required, ValidationService.nomeCompleto]),
        'cpf': this.formBuilder.control(egresso.aluno.alunoCpf.toString(), [Validators.required, ValidationService.CPFValidator]),
        'anoIngresso': this.formBuilder.control(egresso.egressoAnoIngresso, [Validators.required, ValidationService.anoValildo]),
        // tslint:disable-next-line:max-line-length
        'anoConclusao': this.formBuilder.control(egresso.egressoAnoConclusao, [Validators.required, ValidationService.anoValildo, ValidationService.tempoMinCurso])
      });
      this.controls.push(group);
    });


  }

  getNameEgressoDoGroup(i) {
    return this.controls.controls[i].get('nome').value;
  }

  hasError(i, name): boolean {
    return this.controls.controls[i].get(name).errors &&
      this.controls.controls[i].get(name).touched;
  }

  getControl(i, name): AbstractControl {
    return this.controls.controls[i].get(name);
  }
}

