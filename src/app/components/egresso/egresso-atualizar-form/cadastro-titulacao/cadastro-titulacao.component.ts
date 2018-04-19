import { MESSAGES } from './../../../../const/messages';
import { Egresso } from './../../../../models/egresso.model';
import { TipoFormacao } from './../../../../models/tipo-formacao_.model';
import { Aluno } from './../../../../models/aluno.model';
import { Component, OnInit, Inject } from '@angular/core';
import { TitulacaoService } from '../../../../services/titulacao.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EgressoService } from '../../../../services/egresso.service';
import { Titulacao } from '../../../../models/titulacao.model';
import { ValidationService } from '../../../../services/validation.service';

@Component({
  selector: 'app-cadastro-titulacao',
  templateUrl: './cadastro-titulacao.component.html',
  styleUrls: ['./cadastro-titulacao.component.css']
})
export class CadastroTitulacaoComponent implements OnInit {



  title = 'Cadastrar titulação';
  btndescricao = 'Cadastrar';

  titulacoesEgresso: Titulacao[] = [];
  egressoFormTitulacao: FormGroup;

  tipoFormacao: TipoFormacao;

  constructor(
    private titulacaoService: TitulacaoService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private egressoService: EgressoService,
    public dialogRef: MatDialogRef<CadastroTitulacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {

    this.titulacaoService.list().subscribe(
      (titulacoes) => {
        this.titulacoesEgresso = titulacoes;
        console.log(titulacoes);
      }

    );

    this.tipoFormacao = (this.data.tipoFormacao !== undefined) ? this.data.tipoFormacao : false;

    if ( this.tipoFormacao) {
      this.title = 'Alterar titulação';
    this.btndescricao = 'Alterar';

    }
    this.egressoFormTitulacao = this.formBuilder.group({


      // tslint:disable-next-line:max-line-length
      titulacao: this.formBuilder.control(this.tipoFormacao ? this.tipoFormacao.titulacao.titulacaoId.toString() : '', [ValidationService.selectedValidator]),
      area: this.formBuilder.control(this.tipoFormacao ? this.tipoFormacao.tipoFormacaoArea : '', [Validators.required]),
      instituicao: this.formBuilder.control(this.tipoFormacao ? this.tipoFormacao.tipoFormacaoInstituicao : '', [Validators.required]),
      anoConclusao: this.formBuilder.control(this.tipoFormacao ? this.tipoFormacao.tipoFormacaoAnoConclusao : '', [Validators.required]),
    });

    this.egressoFormTitulacao.get('anoConclusao').valueChanges.subscribe(
      (value) => {
        if (this.data.egresso.egressoAnoConclusao >= value) {
          this.egressoFormTitulacao.get('anoConclusao').setErrors({ 'anoConclusaoTitulacaoInvalido': true });
        }
      }
    );
  }

  cadastrar() {
    console.log('teste');
    if (this.egressoFormTitulacao.invalid) {
      Object.keys(this.egressoFormTitulacao.controls).forEach(field => {
        const control = this.egressoFormTitulacao.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      this.toastr.error(MESSAGES['M008']);
    } else {
      this.spinner.show();

      const tipoFormacao: TipoFormacao = {
        // tslint:disable-next-line:max-line-length
        tipoFormacaoId: (this.data.tipoFormacao !== undefined && this.data.tipoFormacao.tipoFormacaoId) ? this.data.tipoFormacao.tipoFormacaoId : '',
        // tslint:disable-next-line:max-line-length
        titulacao: this.titulacoesEgresso.find((t) => t.titulacaoId.toString() === this.egressoFormTitulacao.get('titulacao').value),
        egresso: this.data.egresso,
        tipoFormacaoAnoConclusao: this.egressoFormTitulacao.get('anoConclusao').value,
        tipoFormacaoArea: this.egressoFormTitulacao.get('area').value,
        tipoFormacaoInstituicao: this.egressoFormTitulacao.get('instituicao').value,
      };

      this.egressoService.saveTipoFormacao(tipoFormacao, this.data.egresso.egressoId)
        .finally(() => this.spinner.hide())
        .subscribe(
          (egresso: Egresso) => {
            this.dialogRef.close({
              egresso
            });
          }
        );
    }
  }

}
