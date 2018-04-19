import { Component, OnInit, Inject } from '@angular/core';
import { TitulacaoService } from '../../../../services/titulacao.service';
import { Titulacao } from '../../../../models/titulacao.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MAT_DIALOG_DATA } from '@angular/material';
import { EgressoService } from '../../../../services/egresso.service';

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

  constructor(
    private titulacaoService: TitulacaoService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private egressoService: EgressoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {

    this.titulacaoService.list().subscribe(
      (titulacoes) => {
        this.titulacoesEgresso = titulacoes;
        console.log(titulacoes);
      }

    );

    this.egressoFormTitulacao = this.formBuilder.group({

      titulacaoDescricao: this.formBuilder.control('', [Validators.required]),
      area:         this.formBuilder.control('', [Validators.required]),
      instituicao:  this.formBuilder.control('', [Validators.required]),
      anoConclusao: this.formBuilder.control('', [Validators.required]),
    });
  }

}
