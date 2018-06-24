import { Component, OnInit } from '@angular/core';
import { ConsultaFaixaSalarialService } from '../../../../services/consulta-faixa-salarial.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { EgressoService } from '../../../../services/egresso.service';
import { ConsultaFaixaSalarial } from '../../../../models/consulta-faixa-salarial.model';
import { MESSAGES } from '../../../../const/messages';

@Component({
  selector: 'app-consulta-faixa-salarial',
  templateUrl: './consulta-faixa-salarial.component.html',
  styleUrls: ['./consulta-faixa-salarial.component.css']
})
export class ConsultaFaixaSalarialComponent implements OnInit {

  title = 'Consulta de faixa salarial';
  btndescricao = 'Consultar';

  msg35 = MESSAGES.M035;
  msg36 = MESSAGES.M036;

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
      setorAtuacao: this.formBuilder.control('', [])
    });

    this.consultaForm.get('tipoAno').valueChanges.subscribe(() => {
      this.consultaForm.get('anosIngresso').setValue('');
      this.consultaForm.get('anosConclusao').setValue('');
    });

    this.egressoService.getAnosIngresso().subscribe(
      (result) => {
        this.anosIngresso = result;
      }
    );

    this.egressoService.getAnosConclusao().subscribe(
      (result) => {
        this.anosConclusao = result;
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
    const setor = this.consultaForm.get('setorAtuacao').value === '1' || this.consultaForm.get('setorAtuacao').value === '2' ? parseInt(this.consultaForm.get('setorAtuacao').value, 10) : null;

    this.consultaFSService.consulta(anosI, anosC, setor)
      .finally(() => this.spinner.hide())
      .subscribe(
        (result) => {
          this.consultasFaixaSalarial = result;
        }
      );

  }

  totalEgressos(arraycfs: ConsultaFaixaSalarial[]) {

    let total = 0;

    if (arraycfs) {
      total = arraycfs.map(item => item.totalEgressos)
      .reduce((prev, value) => prev + value, 0);
    }
    return total;
  }

}
