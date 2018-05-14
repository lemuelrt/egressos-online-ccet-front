import { EgressoService } from './../../../../services/egresso.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConsultaAtuacaoProfissionalService } from './../../../../services/consulta-atuacao-profissional.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConsultaAtuacaoProfissional } from '../../../../models/consulta-atuacao-profissional.model';

@Component({
  selector: 'app-consulta-atuacao-profissional',
  templateUrl: './consulta-atuacao-profissional.component.html',
  styleUrls: ['./consulta-atuacao-profissional.component.css']
})
export class ConsultaAtuacaoProfissionalComponent implements OnInit {

  title = 'Consulta de atuação profissional';
  btndescricao = 'Consultar';

  anosIngresso = [];

  anosConclusao = [];

  consultaForm: FormGroup;

  consultasAtuacaoProfissional: ConsultaAtuacaoProfissional[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private consultaAPService: ConsultaAtuacaoProfissionalService,
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
    const setorAtuacao = this.consultaForm.get('setorAtuacao').value !== '' ? parseInt(this.consultaForm.get('setorAtuacao').value, 10) : null;

    this.consultaAPService.consulta(anosI, anosC, setorAtuacao)
      .finally(() => this.spinner.hide())
      .subscribe(
        (result) => {
          this.consultasAtuacaoProfissional = result;
        }
      );

  }

  totalEgressos(arraycap: ConsultaAtuacaoProfissional[]) {

    let total = 0;
    if (arraycap) {
      total = arraycap.map(item => item.quantidade)
        .reduce((prev, value) => prev + value, 0);
    }

    return total;
  }

}
