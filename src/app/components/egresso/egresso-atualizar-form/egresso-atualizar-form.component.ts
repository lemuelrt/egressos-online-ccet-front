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
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material';


import { EOCCET_API_EGRESSO_FOTO } from '../../../app.api';

@Component({
  selector: 'app-egresso-atualizar-form',
  templateUrl: './egresso-atualizar-form.component.html',
  styleUrls: ['./egresso-atualizar-form.component.css']
})


export class EgressoAtualizarFormComponent implements OnInit {

  egressoFormDP: FormGroup;

  egresso: Egresso;

  redesSociais: RedeSocial[] = [];
  egressoFormRS: FormGroup;

  egressoFormGaleria: FormGroup;

  title = 'ALTERAR MEUS DADOS';
  btndescricao = 'Atualizar';

  @ViewChild('fotoPerfil') fotoPerfil;
  urlFotoPerfil: string;

  @ViewChild('fotoGaleria1') fotoGaleria1;
  @ViewChild('fotoGaleria2') fotoGaleria2;
  @ViewChild('fotoGaleria3') fotoGaleria3;
  urlFotosGaleria: string[];

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
  ) { }

  ngOnInit() {

    this.initFormDP();



    this.egressoFormGaleria = this.formBuilder.group({
      descricao1: this.formBuilder.control(''),
      descricao2: this.formBuilder.control(''),
      descricao3: this.formBuilder.control('')
    });




    this.egressoService.getByid(68).subscribe(
      (egresso) => {
        this.egresso = egresso;
        this.setValoresFormDP();


      }
    );

    this.egressoFormRS = this.formBuilder.group({
      'redes': this.formBuilder.array([])
    });
    const controls = <FormArray>this.egressoFormRS.get('redes');
    this.redeSocialService.list().subscribe(
      (redes) => {
        this.redesSociais = redes;
        this.redesSociais.forEach((r) => {
          const group = this.formBuilder.group({
            'id': this.formBuilder.control(r.redeSocialId),
            'link': this.formBuilder.control(''),
          });
          controls.push(group);
        });
      }
    );
  }

  showPreview(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.urlFotoPerfil = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  /**
   * Parte de alteração da foto do perfil
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
    const formData = new FormData();

    if (this.fotoPerfil.nativeElement.files[0] !== undefined) {
      formData.append('fotoPerfil', this.fotoPerfil.nativeElement.files[0], this.fotoPerfil.nativeElement.files[0].name);
    }

    this.egressoService.updateFotoPerfil(formData, 68)
      .finally(() => this.spinner.hide())
      .subscribe(
        (response) => {
          this.urlFotoPerfil = null;
          this.egresso = response;
          this.toastr.success('FOTO SALVA');
          console.log('------------- RESPONSE -----------------');
          console.log(response);
          console.log('----------------------------------------');
        }

      );
  }

  /*
   * Parte de alterar dados pessoais
   */
  initFormDP() {
    this.egressoFormDP = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required, ValidationService.nomeCompleto]),
      email: this.formBuilder.control('', [ValidationService.emailValidator]),
      telefone: this.formBuilder.control('', []),
      cidade: this.formBuilder.control('', []),
      estado: this.formBuilder.control('', []),
      pais: this.formBuilder.control('', []),
      estadoCivil: this.formBuilder.control('', []),
      qtdFilhos: this.formBuilder.control('', []),
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

      console.log(this.egresso.egressoid);
      this.egressoService.updateDadosPessoais(this.prepareEgressoAlterarDP(), this.egresso.egressoid)
        .finally(() => this.spinner.hide())
        .subscribe(
          (response) => {
            this.egresso = response;
            console.log('------------- RESPONSE -----------------');
            console.log(response);
            console.log('----------------------------------------');
          }

        );
    }
  }

  /**
   * parte de alterar redes sociais
   */

  /**
  * parte de alterar galeria de fotos
  */
  getUrlFotoGaleria(indice): string {
    if (this.urlFotosGaleria[indice] !== undefined && this.urlFotosGaleria[indice]) {
      return this.urlFotoPerfil;
    } else if (this.egresso && this.egresso.aluno.fotos[indice] !== undefined) {
      return `${EOCCET_API_EGRESSO_FOTO}/${this.egresso.aluno.fotos[indice].fotoGaleriaLink}`;
    }
    return null;
  }

  getDescricaoGaleriaEgresso(indice) {
    if (this.egresso && this.egresso.aluno.fotos !== undefined && indice < this.egresso.aluno.fotos.length) {
      return `${EOCCET_API_EGRESSO_FOTO}/${this.egresso.aluno.fotos[indice].fotoGaleriaLink}`;
    }
    return null;
  }
}
