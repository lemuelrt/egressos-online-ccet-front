import { MESSAGES } from './../../../../const/messages';
import { EgressoService } from './../../../../services/egresso.service';
import { ConsultaDistribuicaoGeografica } from './../../../../models/consulta-distribuicao-geografica.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConsultaDistribuicaoGeograficaService } from './../../../../services/consulta-distribuicao-geografica.service';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-consulta-distribuicao-geografica',
  templateUrl: './consulta-distribuicao-geografica.component.html',
  styleUrls: ['./consulta-distribuicao-geografica.component.css']
})
export class ConsultaDistribuicaoGeograficaComponent implements OnInit {

  msg33 = MESSAGES.M033;
  msg34 = MESSAGES.M034;


  title = 'Consulta de distribuição geográfica';
  btndescricao = 'Consultar';

  anosIngresso: number[] = [];

  anosConclusao: number[] = [];

  consultaForm: FormGroup;

  consultasDistribuicaoGeografica: ConsultaDistribuicaoGeografica[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private consultaDGService: ConsultaDistribuicaoGeograficaService,
    private spinner: NgxSpinnerService,
    private egressoService: EgressoService
  ) { }

  ngOnInit() {

    this.consultaForm = this.formBuilder.group({
      tipoAno: this.formBuilder.control('1', []),
      anosIngresso: this.formBuilder.control('', []),
      anosConclusao: this.formBuilder.control('', [])
    });

    this.consultaForm.get('tipoAno').valueChanges.subscribe(() => {
      this.consultaForm.get('anosIngresso').setValue('');
      this.consultaForm.get('anosConclusao').setValue('');
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

    this.consultaDGService.consulta(anosI, anosC)
      .finally(() => this.spinner.hide())
      .subscribe(
        (result) => {
          this.consultasDistribuicaoGeografica = result;
        }
      );

  }

  percentualReside(cdg: ConsultaDistribuicaoGeografica, arraycdg: ConsultaDistribuicaoGeografica[]) {

    const total = arraycdg.map(item => item.totalreside)
      .reduce((prev, value) => prev + value, 0);

    return cdg.totalreside / total * 100;
  }

  percentualTrabalha(cdg: ConsultaDistribuicaoGeografica, arraycdg: ConsultaDistribuicaoGeografica[]) {

    const total = arraycdg.map(item => item.totaltrabalha)
      .reduce((prev, value) => prev + value, 0);

    return cdg.totaltrabalha / total * 100;
  }

  totalEgressos(arraycdg: ConsultaDistribuicaoGeografica[]) {
    return arraycdg && arraycdg.length > 0 ? arraycdg[0].totalegressos : 0;
  }


}
