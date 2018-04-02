import { Router } from '@angular/router';
import { EgressoService } from './../../../services/egresso.service';
import { ValidationService } from './../../../services/validation.service';
import { Egresso } from './../../../models/egresso.model';

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
  btndescricao = 'Cadastrar';

  egressoImportGroup: FormGroup;

  controls: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private egressoService: EgressoService,
    private router: Router
  ) { }

  egresosImportado: Egresso[];  // buscar na service de egresso o objeto retornado do arquivo csv

  ngOnInit() {
    if (this.egressoService.egressosImportados.length === 0) {
      this.router.navigate(['/coord/egressos']);
    }

    this.egresosImportado = this.egressoService.egressosImportados;

    this.egressoImportGroup = this.formBuilder.group({
      egressos: this.formBuilder.array([])
    });
    this.controls = <FormArray>this.egressoImportGroup.controls['egressos'];

    this.prepareEgressosFormGroup();
  }


  prepareEgressosFormGroup() {

    this.egresosImportado.forEach((egresso) => {
      const group = this.formBuilder.group({
        'nome': this.formBuilder.control(egresso.aluno.alunoNome, [Validators.required]),
        'cpf': this.formBuilder.control(egresso.aluno.alunoCpf.toString(), [Validators.required, ValidationService.CPFValidator]),
        'anoIngresso': this.formBuilder.control(egresso.egressoAnoIngresso, [Validators.required]),
        'anoConclusao': this.formBuilder.control(egresso.egressoAnoConclusao, [Validators.required]),
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

