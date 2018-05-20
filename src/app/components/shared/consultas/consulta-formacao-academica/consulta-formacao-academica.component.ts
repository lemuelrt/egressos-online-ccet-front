import { EgressoService } from './../../../../services/egresso.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConsultaFormacaoAcademicaService } from './../../../../services/consulta-formacao-academica.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConsultaFormacaoAcademica } from '../../../../models/consulta-formacao-academica.model';
import { MESSAGES } from '../../../../const/messages';

@Component({
  selector: 'app-consulta-formacao-academica',
  templateUrl: './consulta-formacao-academica.component.html',
  styleUrls: ['./consulta-formacao-academica.component.css']
})
export class ConsultaFormacaoAcademicaComponent implements OnInit {

  title = 'Consulta de formação acadêmica';
  btndescricao = 'Consultar';

  msg33 = MESSAGES.M033;
  msg34 = MESSAGES.M034;
  msg35 = MESSAGES.M035;

  anosIngresso = [];

  anosConclusao = [];

  consultaForm: FormGroup;

  consultasFormacaoAcademica: ConsultaFormacaoAcademica[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private consultaFAService: ConsultaFormacaoAcademicaService,
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

    this.consultaFAService.consulta(anosI, anosC)
      .finally(() => this.spinner.hide())
      .subscribe(
        (result) => {
          this.consultasFormacaoAcademica = result;
        }
      );

  }

  totalEgressos(arraycfa: ConsultaFormacaoAcademica[]) {

    let total = 0;
    if (arraycfa) {
      total = arraycfa.map(item => item.quantidade)
        .reduce((prev, value) => prev + value, 0);
    }

    return total;
  }

}
