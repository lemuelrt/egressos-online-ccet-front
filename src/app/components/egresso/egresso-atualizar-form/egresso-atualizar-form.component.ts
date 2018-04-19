import { TipoFormacao } from './../../../models/tipo-formacao_.model';
import { egresso_routes } from './../const/egresso.config';
import { AtuacaoProfissionalService } from './../../../services/atuacao-profissional.service';
import { FaixaSalarialService } from './../../../services/faixa-salarial.service';
import { FaixaSalarial } from './../../../models/faixa-salarial.model';
import { CadastroRedeSocialComponent } from './cadastro-rede-social/cadastro-rede-social.component';
import { FotoGaleria } from './../../../models/foto-galeria.model';
import { Address } from './../../../models/address.model';
import { PesquisarEnderecoComponent } from './pesquisar-endereco/pesquisar-endereco.component';
import { RedeSocialService } from './../../../services/rede-social.service';
import { RedeSocial } from './../../../models/rede-social.model';
import { HttpResponse } from '@angular/common/http';
import { EgressoService } from './../../../services/egresso.service';
import { Egresso } from './../../../models/egresso.model';
import { MESSAGES } from './../../../const/messages';
import { ValidationService } from './../../../services/validation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material';


import { EOCCET_API_EGRESSO_FOTO } from '../../../app.api';
import { AtuacaoProfissional } from '../../../models/atuacao-profissional.model';
import { AtuacaoEgresso } from '../../../models/atuacao-egresso.model';
import { CadastroTitulacaoComponent } from './cadastro-titulacao/cadastro-titulacao.component';
import { Titulacao } from '../../../models/titulacao.model';

@Component({
  selector: 'app-egresso-atualizar-form',
  templateUrl: './egresso-atualizar-form.component.html',
  styleUrls: ['./egresso-atualizar-form.component.css']
})


export class EgressoAtualizarFormComponent implements OnInit {

  egressoFormDP: FormGroup;

  egresso: Egresso;
  titulacao: Titulacao;

  egressoFormGaleria: FormGroup;

  egressoFormAtuacao: FormGroup;
  trabalhaArea = '1';

  faixasSalariais: FaixaSalarial[] = [];
  atuacoesProfissionais: AtuacaoProfissional[] = [];

  title = 'ALTERAR MEUS DADOS';
  btndescricao = 'Atualizar';

  @ViewChild('fotoPerfil') fotoPerfil;
  urlFotoPerfil: string;

  @ViewChild('fotoGaleria1') fotoGaleria1;
  @ViewChild('fotoGaleria2') fotoGaleria2;
  @ViewChild('fotoGaleria3') fotoGaleria3;
  urlFotosGaleria = { 0: '', 1: '', 2: '' };

  endereco_formatado: string;

  estadosCivis: { id: string, nome: string }[] = [
    { id: '1', nome: 'Solteiro' },
    { id: '2', nome: 'Casado' },
    { id: '3', nome: 'Divorciado' },
    { id: '4', nome: 'Viúvo' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private egressoService: EgressoService,
    private redeSocialService: RedeSocialService,
    private dialog: MatDialog,
    private faixasSalariaisService: FaixaSalarialService,
    private atuacoesProfissionaisSerivice: AtuacaoProfissionalService,
  ) { }

  ngOnInit() {

    this.initFormDP();

    this.initFormGaleria();

    this.initFormAtuacao();

    this.egressoService.getByid(68).subscribe(
      (egresso) => {
        console.log(egresso);
        this.egresso = egresso;
        this.setValoresFormDP();
        this.setValoresFormGaleria();
        this.setValoresFormAtuacao();
      }
    );

    this.atuacoesProfissionaisSerivice.list().subscribe(
      (atuacoes) => this.atuacoesProfissionais = atuacoes
    );

    this.faixasSalariaisService.list().subscribe(
      (faixas) => this.faixasSalariais = faixas
    );
  }

  showPreview(event, indice?: number) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        if (indice === undefined) {
          this.urlFotoPerfil = event.target.result;
        } else if (indice >= 0 && indice <= 2) {
          this.urlFotosGaleria[indice] = event.target.result;
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  /**
   * inicio -alteração da foto do perfil
   */
  getUrlFoto(): string {
    if (this.urlFotoPerfil) {
      return this.urlFotoPerfil;
    } else if (this.egresso && this.egresso.aluno.alunoFotoPerfil) {
      return `${EOCCET_API_EGRESSO_FOTO}/${this.egresso.aluno.alunoFotoPerfil}`;
    }
    return null;
  }

  alterarFotoPerfil() {

    this.spinner.show();
    if (this.fotoPerfil.nativeElement.files[0] !== undefined) {
      const formData = new FormData();


      formData.append('fotoPerfil', this.fotoPerfil.nativeElement.files[0], this.fotoPerfil.nativeElement.files[0].name);


      this.egressoService.updateFotoPerfil(formData, 68)
        .finally(() => this.spinner.hide())
        .subscribe(
          (response) => {
            this.urlFotoPerfil = null;
            this.egresso = response;
            this.toastr.success(MESSAGES['M011']);
            console.log('------------- RESPONSE -----------------');
            console.log(response);
            console.log('----------------------------------------');
          }

        );
    } else {
      this.toastr.success(MESSAGES['M011']);
      this.spinner.hide();
    }
  }
  /**
   * fim -alteração da foto do perfil
   */


  /*
   * inicio - alterar DP (dados pessoais )
   */
  initFormDP() {
    this.egressoFormDP = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required, ValidationService.nomeCompleto]),
      email: this.formBuilder.control('', [ValidationService.emailValidator]),
      telefone: this.formBuilder.control('', [ValidationService.telefoneValidator]),
      cidade: this.formBuilder.control('', []),
      estado: this.formBuilder.control('', []),
      pais: this.formBuilder.control('', []),
      estadoCivil: this.formBuilder.control('', []),
      qtdFilhos: this.formBuilder.control('', [ValidationService.qtdFilhos]),
    });
  }

  setValoresFormDP() {
    if (this.egresso !== undefined) {
      this.egressoFormDP.get('nome').setValue('' + this.egresso.aluno.alunoNome);
      this.egressoFormDP.get('email').setValue(this.egresso.aluno.alunoEmail ? this.egresso.aluno.alunoEmail : '');
      this.egressoFormDP.get('telefone').setValue(this.egresso.aluno.alunoTelefone ? this.egresso.aluno.alunoTelefone : '');
      this.egressoFormDP.get('cidade').setValue(this.egresso.aluno.alunoCidade);
      this.egressoFormDP.get('estado').setValue(this.egresso.aluno.alunoEstado);
      this.egressoFormDP.get('pais').setValue(this.egresso.aluno.alunoPais);
      this.egressoFormDP.get('estadoCivil').setValue(this.egresso.aluno.alunoEstadoCivil ? this.egresso.aluno.alunoEstadoCivil : '');
      this.egressoFormDP.get('qtdFilhos').setValue(this.egresso.aluno.alunoQtdFilhos);
    }
  }

  localReside() {
    if (this.egressoFormDP.get('cidade').value) {
      // tslint:disable-next-line:max-line-length
      return `${this.egressoFormDP.get('cidade').value}, ${this.egressoFormDP.get('estado').value}, ${this.egressoFormDP.get('pais').value}`;
    }
    return '';
  }

  searchEndereco() {
    const dialogRef = this.dialog.open(PesquisarEnderecoComponent, {
      width: 'auto',
      autoFocus: false,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result instanceof Address) {
        this.egressoFormDP.get('cidade').setValue(result.cidade);
        this.egressoFormDP.get('estado').setValue(result.estado);
        this.egressoFormDP.get('pais').setValue(result.pais);

        this.endereco_formatado = this.egressoFormDP.get('cidade').value + ', ' +
          this.egressoFormDP.get('estado').value + ', ' +
          this.egressoFormDP.get('pais').value;
      }
    });
  }

  prepareEgressoAlterarDP(): Egresso {
    const egressoAlterar: Egresso = this.egresso;
    egressoAlterar.aluno.alunoNome = this.egressoFormDP.get('nome').value;
    egressoAlterar.aluno.alunoEmail = this.egressoFormDP.get('email').value;
    egressoAlterar.aluno.alunoTelefone = this.egressoFormDP.get('telefone').value;
    egressoAlterar.aluno.alunoCidade = this.egressoFormDP.get('cidade').value;
    egressoAlterar.aluno.alunoEstado = this.egressoFormDP.get('estado').value;
    egressoAlterar.aluno.alunoPais = this.egressoFormDP.get('pais').value;
    egressoAlterar.aluno.alunoEstadoCivil = this.egressoFormDP.get('estadoCivil').value;
    egressoAlterar.aluno.alunoQtdFilhos = this.egressoFormDP.get('qtdFilhos').value;

    return egressoAlterar;
  }

  alterarDP() {

    if (this.egressoFormDP.invalid) {
      Object.keys(this.egressoFormDP.controls).forEach(field => {
        const control = this.egressoFormDP.get(field);
        control.markAsTouched({ onlySelf: true });
      });

      this.toastr.error(MESSAGES['M008']);
    } else {
      this.spinner.show();

      this.egressoService.updateDadosPessoais(this.prepareEgressoAlterarDP(), this.egresso.egressoId)
        .finally(() => this.spinner.hide())
        .subscribe(
          (response) => {
            this.egresso = response;
            this.toastr.success(MESSAGES['M011']);
            console.log('------------- RESPONSE -----------------');
            console.log(response);
            console.log('----------------------------------------');
          }

        );
    }
  }
  /*
   * fim - alterar DP (dados pessoais )
   */


  /**
   * inicio - redes sociais
   */
  openDialogAddRS() {
    const dialogRef = this.dialog.open(CadastroRedeSocialComponent, {
      width: 'auto',
      autoFocus: false,
      data: { egresso: this.egresso }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result && result.egresso !== undefined) {
        this.toastr.success(MESSAGES['M010']);
        this.egresso = result.egresso;
      }

    });
  }
  /**
   * fim - redes sociais
   */


  /**
     * parte de adicionar uma nova titulação
     */
  /**
     * inicio - adicionar uma nova titulação
     */
  openDialogAddTL(tipoFormacao?: TipoFormacao) {
    const dialogRef = this.dialog.open(CadastroTitulacaoComponent, {
      width: 'auto',
      maxWidth: 400,
      autoFocus: false,
      data: { egresso: this.egresso, tipoFormacao: tipoFormacao }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.egresso !== undefined) {
        this.egresso = result.egresso;
        if (tipoFormacao === undefined) {
          this.toastr.success(MESSAGES['M010']);
        } else {
          this.toastr.success(MESSAGES['M011']);
        }

      }
    });
  }
  /**
     * fim - adicionar uma nova titulação
     */


  /**
  *  Inicio -  galeria de fotos
  */
  initFormGaleria() {
    this.egressoFormGaleria = this.formBuilder.group({
      descricao1: this.formBuilder.control(''),
      descricao2: this.formBuilder.control(''),
      descricao3: this.formBuilder.control('')
    });

    this.addValidacaoDescChange(this.egressoFormGaleria.controls.descricao1, 0);
    this.addValidacaoDescChange(this.egressoFormGaleria.controls.descricao2, 1);
    this.addValidacaoDescChange(this.egressoFormGaleria.controls.descricao3, 2);

  }

  addValidacaoDescChange(control: AbstractControl, indice) {
    control.valueChanges.subscribe((value) => {

      if (this.getUrlFotoGaleria(indice) && value === '') {
        console.log('Valor' + indice + ': ' + value);
        control.setErrors({ 'required': true });
      }
    });
  }

  showPreviewEValidaDesc(event, indice) {
    this.showPreview(event, indice);

    const name_control = 'descricao' + (indice + 1);
    if (this.egressoFormGaleria.get(name_control).value === '') {
      this.egressoFormGaleria.get(name_control).setErrors({ 'required': true });
    }
  }

  setValoresFormGaleria() {
    if (this.egresso.aluno.fotos.length > 0) {
      this.egressoFormGaleria.controls.descricao1.setValue(this.egresso.aluno.fotos[0].fotoGaleriaDescricao);
    }

    if (this.egresso.aluno.fotos.length > 1) {
      this.egressoFormGaleria.controls.descricao2.setValue(this.egresso.aluno.fotos[1].fotoGaleriaDescricao);
    }

    if (this.egresso.aluno.fotos.length > 2) {
      this.egressoFormGaleria.controls.descricao3.setValue(this.egresso.aluno.fotos[2].fotoGaleriaDescricao);
    }
  }

  getUrlFotoGaleria(indice): string {

    if (this.urlFotosGaleria[indice] !== undefined && this.urlFotosGaleria[indice] !== '') {

      return this.urlFotosGaleria[indice];
    } else if (this.egresso && this.egresso.aluno.fotos !== undefined &&
      indice < this.egresso.aluno.fotos.length) {
      return `${EOCCET_API_EGRESSO_FOTO}/${this.egresso.aluno.fotos[indice].fotoGaleriaLink}`;
    } else {

    }
    return null;
  }

  getDescricaoGaleriaEgresso(indice) {
    if (this.egresso && this.egresso.aluno.fotos !== undefined && indice < this.egresso.aluno.fotos.length) {
      return `${EOCCET_API_EGRESSO_FOTO}/${this.egresso.aluno.fotos[indice].fotoGaleriaLink}`;
    }
    return null;
  }

  alterarGaleria() {

    if (this.egressoFormGaleria.invalid) {
      Object.keys(this.egressoFormGaleria.controls).forEach(field => {
        this.egressoFormGaleria.get(field).markAsTouched({ onlySelf: true });
      });
      this.toastr.error(MESSAGES['M008']);
    } else {
      this.spinner.show();

      const formData = new FormData();

      if (this.fotoGaleria1.nativeElement.files[0] !== undefined) {
        formData.append('fotoGaleria1', this.fotoGaleria1.nativeElement.files[0], this.fotoGaleria1.nativeElement.files[0].name);
        formData.append('descFotoGalaria1', this.egressoFormGaleria.get('descricao1').value);
        if (this.egresso.aluno.fotos.length > 0) {
          formData.append('idFotoGalaria1', this.egresso.aluno.fotos[0].fotoGaleriaId);
        }
      }

      if (this.fotoGaleria2.nativeElement.files[0] !== undefined) {
        formData.append('fotoGaleria2', this.fotoGaleria2.nativeElement.files[0], this.fotoGaleria2.nativeElement.files[0].name);
        formData.append('descFotoGalaria2', this.egressoFormGaleria.get('descricao2').value);
        if (this.egresso.aluno.fotos.length > 1) {
          formData.append('idFotoGalaria2', this.egresso.aluno.fotos[1].fotoGaleriaId);
        }
      }

      if (this.fotoGaleria3.nativeElement.files[0] !== undefined) {
        formData.append('fotoGaleria3', this.fotoGaleria3.nativeElement.files[0], this.fotoGaleria3.nativeElement.files[0].name);
        formData.append('descFotoGalaria3', this.egressoFormGaleria.get('descricao3').value);
        if (this.egresso.aluno.fotos.length > 2) {
          formData.append('idFotoGalaria3', this.egresso.aluno.fotos[2].fotoGaleriaId);
        }
      }

      this.egressoService.updateGaleria(formData, this.egresso.egressoId)
        .finally(() => this.spinner.hide())
        .subscribe(
          (response) => {
            this.urlFotosGaleria = { 0: '', 1: '', 2: '' };
            this.egresso = response;
            this.toastr.success(MESSAGES['M011']);
            console.log('------------- RESPONSE -----------------');
            console.log(response);
            console.log('----------------------------------------');
          }

        );
    }
  }
  /**
  *  fim -  galeria de fotos
  */


  /**
   * inicio - Form atuação profissional
   */
  initFormAtuacao() {
    this.egressoFormAtuacao = this.formBuilder.group({
      'trabalhaArea': this.formBuilder.control('2', [Validators.required]),
      'setor': this.formBuilder.control('', [Validators.required]),
      'empresa': this.formBuilder.control('', [Validators.required, ValidationService.nomeAtuacaoProfissionalCompleto]),
      'atuacaoProfissionalId': this.formBuilder.control('', [Validators.required]),
      'homeOffice': this.formBuilder.control('', [Validators.required]),
      'cidade': this.formBuilder.control('', [Validators.required]),
      'estado': this.formBuilder.control('', [Validators.required]),
      'pais': this.formBuilder.control('', [Validators.required]),
      'faixaSalarialId': this.formBuilder.control(''),
      'reside': this.formBuilder.control('', [Validators.required]),
    });
    this.isArea();
    this.egressoFormAtuacao.get('reside').disable({ onlySelf: true });
  }

  setValoresFormAtuacao(setTrabalhaArea = true, verifica_area = true) {
    if (this.egresso !== undefined) {

      const isAtuacao: boolean = (this.egresso.atuacoesProfissional && this.egresso.atuacoesProfissional.length > 0);

      if (setTrabalhaArea) {
        this.egressoFormAtuacao.get('trabalhaArea').setValue(isAtuacao ? '1' : '2');
      }

      this.egressoFormAtuacao.get('setor').setValue(isAtuacao ? '' + this.egresso.atuacoesProfissional[0].atuacaoEgressoSetor : '');
      this.egressoFormAtuacao.get('empresa').setValue(isAtuacao ? this.egresso.atuacoesProfissional[0].atuacaoEgressoEmpresa : '');
      // tslint:disable-next-line:max-line-length
      this.egressoFormAtuacao.get('atuacaoProfissionalId').setValue(isAtuacao ? this.egresso.atuacoesProfissional[0].atuacaoProfissional.atuacaoProfissionalId : '');
      this.egressoFormAtuacao.get('cidade').setValue(isAtuacao ? this.egresso.atuacoesProfissional[0].atuacaoEgressoCidade : '');
      this.egressoFormAtuacao.get('estado').setValue(isAtuacao ? this.egresso.atuacoesProfissional[0].atuacaoEgressoEstado : '');
      this.egressoFormAtuacao.get('pais').setValue(isAtuacao ? this.egresso.atuacoesProfissional[0].atuacaoEgressoPais : '');
      this.egressoFormAtuacao.get('homeOffice').setValue(isAtuacao ? this.egresso.atuacoesProfissional[0].atuacaoEgressoHomeOffice : '');
      // tslint:disable-next-line:max-line-length
      this.egressoFormAtuacao.get('faixaSalarialId').setValue(isAtuacao && this.egresso.atuacoesProfissional[0].faixaSalarial ? this.egresso.atuacoesProfissional[0].faixaSalarial.faixaSalarialId : '');
      this.egressoFormAtuacao.get('reside').setValue(
        isAtuacao ?
          ((this.egresso.atuacoesProfissional[0].atuacaoEgressoCidade) ?
            this.egresso.atuacoesProfissional[0].atuacaoEgressoCidade + ', ' +
            this.egresso.atuacoesProfissional[0].atuacaoEgressoEstado + ', ' +
            this.egresso.atuacoesProfissional[0].atuacaoEgressoPais : '') : ''
      );
    }

      if (verifica_area) {
      this.isArea();
    }
  }

  isArea() {
    if (this.egressoFormAtuacao.get('trabalhaArea').value === '1') {
      this.egressoFormAtuacao.enable({ onlySelf: true });
      this.egressoFormAtuacao.get('reside').disable({ onlySelf: true });
      this.setValoresFormAtuacao(false, false);
    } else {
      this.egressoFormAtuacao.disable({ onlySelf: true });
      this.egressoFormAtuacao.reset();
      this.egressoFormAtuacao.get('trabalhaArea').setValue('2');
      this.egressoFormAtuacao.get('trabalhaArea').enable({ onlySelf: true });
    }

  }

  alterarAtuacao() {

    if (this.egressoFormAtuacao.invalid) {
      Object.keys(this.egressoFormAtuacao.controls).forEach(field => {
        const control = this.egressoFormAtuacao.get(field);
        control.markAsTouched({ onlySelf: true });
      });

      this.toastr.error(MESSAGES['M008']);
    } else {
      this.spinner.show();

      if (this.egressoFormAtuacao.get('trabalhaArea').value === '1') {

        this.egressoService.updateAtuacao(this.prepareAtuacaoAlterar(), this.egresso.egressoId)
          .finally(() => this.spinner.hide())
          .subscribe(
            (response) => {
              this.egresso = response;
              this.toastr.success(MESSAGES['M011']);
              console.log('------------- RESPONSE 1 -----------------');
              console.log(response);
              console.log('----------------------------------------');
            }

          );
      } else {
        this.egressoService.removeAtuacao(this.egresso.egressoId)
          .finally(() => this.spinner.hide())
          .subscribe(
            (response) => {
              this.egresso = response;
              this.toastr.success(MESSAGES['M011']);
              this.setValoresFormAtuacao();
              console.log('------------- RESPONSE 2 -----------------');
              console.log(response);
              console.log('----------------------------------------');
            }

          );
      }
    }
  }

  prepareAtuacaoAlterar(): AtuacaoEgresso {
    const atuacao: AtuacaoEgresso = new AtuacaoEgresso();

    if (this.egresso.atuacoesProfissional && this.egresso.atuacoesProfissional.length > 0) {
      atuacao.atuacaoEgressoId = this.egresso.atuacoesProfissional[0].atuacaoEgressoId;
    }

    atuacao.atuacaoEgressoCidade = this.egressoFormAtuacao.get('cidade').value;
    atuacao.atuacaoEgressoEmpresa = this.egressoFormAtuacao.get('empresa').value;
    atuacao.atuacaoEgressoEstado = this.egressoFormAtuacao.get('estado').value;
    atuacao.atuacaoEgressoHomeOffice = this.egressoFormAtuacao.get('homeOffice').value;
    atuacao.atuacaoEgressoPais = this.egressoFormAtuacao.get('pais').value;
    atuacao.atuacaoEgressoSetor = this.egressoFormAtuacao.get('setor').value;
    if (this.egressoFormAtuacao.get('faixaSalarialId').value !== '') {
      // tslint:disable-next-line:max-line-length
      atuacao.faixaSalarial = this.faixasSalariais.find((f) => f.faixaSalarialId.toString() === this.egressoFormAtuacao.get('faixaSalarialId').value);
    }

    // tslint:disable-next-line:max-line-length
    atuacao.atuacaoProfissional = this.atuacoesProfissionais.find((a) => a.atuacaoProfissionalId.toString() === this.egressoFormAtuacao.get('atuacaoProfissionalId').value);

    return atuacao;
  }

  pesquisaLocalTrabalha() {

    if (this.egressoFormAtuacao.get('trabalhaArea').value === '1') {
      const dialogRef = this.dialog.open(PesquisarEnderecoComponent, {
        width: 'auto',
        autoFocus: false,
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result && result instanceof Address) {
          this.egressoFormAtuacao.get('cidade').setValue(result.cidade);
          this.egressoFormAtuacao.get('estado').setValue(result.estado);
          this.egressoFormAtuacao.get('pais').setValue(result.pais);

          this.egressoFormAtuacao.get('reside').setValue(this.egressoFormAtuacao.get('cidade').value + ', ' +
            this.egressoFormAtuacao.get('estado').value + ', ' +
            this.egressoFormAtuacao.get('pais').value
          );
        }
      });
    }


  }

  /**
   * fim - Form atuação profissional
   */
}
