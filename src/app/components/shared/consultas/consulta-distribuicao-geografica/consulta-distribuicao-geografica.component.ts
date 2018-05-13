import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConsultaDistribuicaoGeograficaService } from './../../../../services/consulta-distribuicao-geografica.service';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-consulta-distribuicao-geografica',
  templateUrl: './consulta-distribuicao-geografica.component.html',
  styleUrls: ['./consulta-distribuicao-geografica.component.css']
})
export class ConsultaDistribuicaoGeograficaComponent implements OnInit {

  title = 'Consulta de distribuição geográfica';
  btndescricao = 'Consultar';

  anosIngresso: { ano: number }[] = [{ ano: 2010 }, { ano: 2011 }, { ano: 2012 }, { ano: 2013 }];

  anosConclusao: { ano: number }[] = [{ ano: 2013 }, { ano: 2014 }, { ano: 2015 }, { ano: 2016 }];

  consultaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private consultaDGService: ConsultaDistribuicaoGeograficaService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {

    this.consultaForm = this.formBuilder.group({
      tipoAno: this.formBuilder.control('1', []),
      anosIngresso: this.formBuilder.control('', []),
      anosConclusao: this.formBuilder.control('', [])
    });

  }


}
