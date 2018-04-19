import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Titulacao } from '../models/titulacao.model';
import { EOCCET_API } from '../app.api';

@Injectable()
export class TitulacaoService {

  constructor(private http: HttpClient) { }

  list(): Observable<Titulacao[]> {

    return this.http.get<Titulacao[]>(`${EOCCET_API}/titulacoes`);
  }


}
