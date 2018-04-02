import { ValidationService } from './../../../services/validation.service';
import { Aluno } from './../../../models/aluno.model';
import { Egresso } from './../../../models/egresso.model';
import { EgressoService } from './../../../services/egresso.service';
import { MESSAGES } from './../../../const/messages';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CoordComponent } from './../coord.component';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-coord-egresso-form',
  templateUrl: './coord-egresso-form.component.html',
  styleUrls: ['./coord-egresso-form.component.css']
})
export class CoordEgressoFormComponent implements OnInit, AfterViewInit  {

  coordEgressoform: FormGroup;

  egresso: Egresso = null;

  title = 'Cadastro de Egresso';
  btndescricao = 'Cadastrar';

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private egressoService: EgressoService,
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.params['id'];

    // Validações do form de Inclusão de um único Egresso

    this.coordEgressoform = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required, ValidationService.nomeCompleto]),
      cpf: this.formBuilder.control('', [Validators.required, ValidationService.CPFValidator]),
      anoDeIngresso: this.formBuilder.control('', [Validators.required, ValidationService.anoValildo]),
      anoDeConclusao: this.formBuilder.control('', [Validators.required, ValidationService.anoValildo, ValidationService.tempoMinCurso])
    });

  }

  ngAfterViewInit() {
  }

  // metódo para apenas salvar o egresso em questão que for cadastrado

  save() {

    if (this.coordEgressoform.invalid) {
      Object.keys(this.coordEgressoform.controls).forEach(field => {
        const control = this.coordEgressoform.get(field);
        control.markAsTouched({ onlySelf: true });
      });

      this.toastr.error(MESSAGES['M008']);

    } else {


      // No TypeScript é permitido atribuir objetos literais para variáveis declaradas
      // como classes ou interface - desde que sejam compativeis

      let aluno: Aluno = null;
      aluno = {
        alunoNome: this.coordEgressoform.controls.nome.value,
        alunoCpf: this.coordEgressoform.controls.cpf.value
      };

      const egresso: Egresso = {
        aluno,
        egressoAnoIngresso: this.coordEgressoform.controls.anoDeIngresso.value,
        egressoAnoConclusao: this.coordEgressoform.controls.anoDeConclusao.value

      };

      // console.log(egresso);

      if (this.egresso === null) {
        this.egressoService.save(egresso).subscribe(
          (egressoResponse) => {
            // console.log(coordenadorResponse);
            this.toastr.success(MESSAGES['M022']);
            this.router.navigate(['/coord/egressos']);
          }
        );
      }

    }
  }
}
