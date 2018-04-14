import { MESSAGES } from './../../../const/messages';
import { ValidationService } from './../../../services/validation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-egresso-atualizar-form',
  templateUrl: './egresso-atualizar-form.component.html',
  styleUrls: ['./egresso-atualizar-form.component.css']
})
export class EgressoAtualizarFormComponent implements OnInit {

  egressoForm: FormGroup;


  title = 'Atualização de egresso';
  btndescricao = 'Atualizar';

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {

    this.egressoForm = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required, ValidationService.nomeCompleto]),
      foto: this.formBuilder.control('', [Validators.required])
    });

  }



  update() {

    if (this.egressoForm.invalid) {
      Object.keys(this.egressoForm.controls).forEach(field => {
        const control = this.egressoForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });

      this.toastr.error(MESSAGES['M008']);
    } else {
      this.spinner.show();
      const egresso: any = {
        atuacaoProfissionalNome: this.egressoForm.controls.nome.value,
        atuacaoProfissionalStatus: 1
      };


      // console.log(atuacaoProfissional);


    }
  }

}
