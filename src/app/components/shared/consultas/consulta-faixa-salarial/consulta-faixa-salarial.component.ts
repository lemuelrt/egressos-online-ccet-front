import { Component, OnInit } from '@angular/core';
import { ConsultaFaixaSalarialService } from '../../../../services/consulta-faixa-salarial.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { EgressoService } from '../../../../services/egresso.service';
import { ConsultaFaixaSalarial } from '../../../../models/consulta-faixa-salarial.model';

@Component({
  selector: 'app-consulta-faixa-salarial',
  templateUrl: './consulta-faixa-salarial.component.html',
  styleUrls: ['./consulta-faixa-salarial.component.css']
})
export class ConsultaFaixaSalarialComponent implements OnInit {

  title = 'Consulta de faixa salarial';
  btndescricao = 'Consultar';

  anosIngresso = [];

  anosConclusao = [];

  consultaForm: FormGroup;

  consultasFaixaSalarial: ConsultaFaixaSalarial[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private consultaFSService: ConsultaFaixaSalarialService ,
    private spinner: NgxSpinnerService,
    private egressoService: EgressoService
  ) { }

  ngOnInit() {


    this.consultaForm = this.formBuilder.group({
      tipoAno: this.formBuilder.control('1', []),
      anosIngresso: this.formBuilder.control('', []),
      anosConclusao: this.formBuilder.control('', []),
      setor : this.formBuilder.control('1', [])
    });

    this.consultaForm.get('tipoAno').valueChanges.subscribe(() => {
      this.consultaForm.get('anosIngresso').setValue('');
      this.consultaForm.get('anosConclusao').setValue('');
    });

    this.consultaForm.get('setor').valueChanges.subscribe(() => {
      this.consultaForm.get('setor').setValue('');
    });

    this.egressoService.getAnosIngresso().subscribe(
      (result) => {
        this.anosIngresso = result;
        console.log(result);
      }
    );

    this.egressoService.getAnosConclusao().subscribe(
      (result) => {
        this.anosConclusao = result;
        console.log(result);
      }
    );
  }

  consultar() {

    this.spinner.show();

    // tslint:disable-next-line:max-line-length
    const anosI = this.consultaForm.get('tipoAno').value === '1' && this.consultaForm.get('anosIngresso').value ? this.consultaForm.get('anosIngresso').value : [];
    // tslint:disable-next-line:max-line-length
    const anosC = this.consultaForm.get('tipoAno').value === '2' && this.consultaForm.get('anosConclusao').value ? this.consultaForm.get('anosConclusao').value : [];
    // tslint:disable-next-line:max-line-length
    const setor = this.consultaForm.get('setor').value === '1' || '2' && this.consultaForm.get('setor').value ? this.consultaForm.get('setor').value : [];
    console.log(setor);
    this.consultaFSService.consulta(anosI, anosC, setor)
      .finally(() => this.spinner.hide())
      .subscribe(
        (result) => {
          this.consultasFaixaSalarial = result;
        }
      );

  }

}
