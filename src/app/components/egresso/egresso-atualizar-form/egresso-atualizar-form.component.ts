import { HttpResponse } from '@angular/common/http';
import { EgressoService } from './../../../services/egresso.service';
import { Egresso } from './../../../models/egresso.model';
import { MESSAGES } from './../../../const/messages';
import { ValidationService } from './../../../services/validation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EOCCET_API_EGRESSO_FOTO } from '../../../app.api';

@Component({
  selector: 'app-egresso-atualizar-form',
  templateUrl: './egresso-atualizar-form.component.html',
  styleUrls: ['./egresso-atualizar-form.component.css']
})
export class EgressoAtualizarFormComponent implements OnInit {

  egressoFormDP: FormGroup;

  egresso: Egresso;


  title = 'ALTERAR MEUS DADOS';
  btndescricao = 'Atualizar';

  @ViewChild('fotoPerfil') fotoPerfil;

  @ViewChild('fotoGaleria1') fotoGaleria1;
  @ViewChild('fotoGaleria2') fotoGaleria2;
  @ViewChild('fotoGaleria3') fotoGaleria3;

  urlFotoPerfil: string;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private egressoService: EgressoService,
  ) { }

  ngOnInit() {

    this.egressoFormDP = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required, ValidationService.nomeCompleto]),
      email: this.formBuilder.control('', [Validators.required, ValidationService.emailValidator]),
      telefone: this.formBuilder.control('', [Validators.required]),
      cidade: this.formBuilder.control('', [Validators.required]),
      estado: this.formBuilder.control('', [Validators.required]),
      pais: this.formBuilder.control('', [Validators.required]),
      estadoCivil: this.formBuilder.control('', [Validators.required]),
      qtdFilhos: this.formBuilder.control(''),
    });

    this.egressoService.getByid(68).subscribe(
      (egresso) => {
        this.egresso = egresso;
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
   * Alterar dados pessoais
   */
  alterarDP() {

    if (this.egressoFormDP.invalid) {
      Object.keys(this.egressoFormDP.controls).forEach(field => {
        const control = this.egressoFormDP.get(field);
        control.markAsTouched({ onlySelf: true });
      });

      this.toastr.error(MESSAGES['M008']);
    } else {
      this.spinner.show();
      const formData = new FormData();

      if (this.fotoPerfil.nativeElement.files[0] !== undefined) {
        formData.append('fotoPerfil', this.fotoPerfil.nativeElement.files[0], this.fotoPerfil.nativeElement.files[0].name);
      }


      formData.append('egressoid', '42');
      formData.append('egressoAnoIngresso', '2010');
      formData.append('egressoAnoConclusao', '2014');
      formData.append('aluno', new Blob([JSON.stringify({
        'alunoId': '43',
        'alunoNome': 'Marcos Roberto',
        'alunoCpf': '03073673121'
      })], {
          type: 'application/json'
        }));
      // formData.append('oferta', null);
      // formData.append('egressoDataAtualizacao', '2018-04-14');
      // formData.append('titulacoes', null);
      // formData.append('atuacoesProfissional', null);

      this.egressoService.updateFotoPerfil(formData, 68)
        .finally(() => this.spinner.hide())
        .subscribe(
          (response) => {
            if (response instanceof HttpResponse) {
              console.log('------------- RESPONSE -----------------');
              console.log(response);
              console.log('----------------------------------------');
            }

          }

        );

      // console.log(atuacaoProfissional);


    }
  }

}
