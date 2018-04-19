import { Egresso } from './../../../../models/egresso.model';
import { Aluno } from './../../../../models/aluno.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RedeAluno } from './../../../../models/rede-aluno.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { EgressoService } from './../../../../services/egresso.service';
import { RedeSocialService } from './../../../../services/rede-social.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RedeSocial } from './../../../../models/rede-social.model';
import { Component, OnInit, Inject } from '@angular/core';
import { ValidationService } from '../../../../services/validation.service';

@Component({
  selector: 'app-cadastro-rede-social',
  templateUrl: './cadastro-rede-social.component.html',
  styleUrls: ['./cadastro-rede-social.component.css']
})
export class CadastroRedeSocialComponent implements OnInit {

  redesSociais: RedeSocial[] = [];
  egressoFormRS: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private egressoService: EgressoService,
    private redeSocialService: RedeSocialService,
    public dialogRef: MatDialogRef<CadastroRedeSocialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.redeSocialService.list().subscribe(
      (redes) => {
        this.redesSociais = redes;
      }

    );

    this.egressoFormRS = this.formBuilder.group({
      redeSocialId: this.formBuilder.control('', [ValidationService.selectedValidator]),
      link: this.formBuilder.control('', [Validators.required]),
    });

  }

  cadastrar() {
    if (this.egressoFormRS.valid) {
      this.spinner.show();
      const aluno: Aluno = this.data.egresso.aluno;
      const redeAluno: RedeAluno = {
        aluno: aluno,
        redeSocial: this.redesSociais.find((rede) => rede.redeSocialId.toString() === this.egressoFormRS.get('redeSocialId').value),
        redeAlunoLink: this.egressoFormRS.get('link').value
      };

      this.egressoService.updateRedeSocial(redeAluno, this.data.egresso.egressoId)
        .finally(() => this.spinner.hide())
        .subscribe(
          (egresso: Egresso) => {
            this.dialogRef.close({egresso});
          }
        );
    }
  }
}
