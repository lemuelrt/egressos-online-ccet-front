import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CoordComponent } from './../coord.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-coord-egresso-form',
  templateUrl: './coord-egresso-form.component.html',
  styleUrls: ['./coord-egresso-form.component.css']
})
export class CoordEgressoFormComponent implements OnInit, AfterViewInit  {

  coordEgressoform: FormGroup;

  title = 'Cadastro de Egresso';
  btndescricao = 'Cadastrar';

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.params['id'];

    // Validações do form de Inclusão de um único Egresso

    this.coordEgressoform = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required, ValidationService.nomeCompleto]),
      cpf: this.formBuilder.control('', [Validators.required, ValidationService.CPFValidator]),
      anoDeIngresso: this.formBuilder.control('', [Validators.required]),
      anoDeConclusao: this.formBuilder.control('', [Validators.required] ),
      oferta: this.formBuilder.control('', [ValidationService.selectedValidator])
    });

  }

  ngAfterViewInit() {
  }

  // metódo para apenas salvar o egresso em questão que for cadastrado

  save() {

  }

}
