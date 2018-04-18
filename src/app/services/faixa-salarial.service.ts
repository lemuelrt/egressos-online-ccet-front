import { FaixaSalarial } from './../models/faixa-salarial.model';
import { EOCCET_API } from './../app.api';
import { AtuacaoProfissional } from './../models/atuacao-profissional.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { RedeSocial } from '../models/rede-social.model';

@Injectable()
export class FaixaSalarialService {

  constructor(private http: HttpClient) { }

  list(): Observable<FaixaSalarial[]> {

    return this.http.get<FaixaSalarial[]>(`${EOCCET_API}/faixas-salariais`);
  }


}
