import { EOCCET_API } from './../app.api';
import { AtuacaoProfissional } from './../models/atuacao-profissional.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AtuacaoProfissionalService {

  constructor(private http: HttpClient) { }

  list(): Observable<AtuacaoProfissional[]> {

    return this.http.get<AtuacaoProfissional[]>(`${EOCCET_API}/atuacoes-profissionais`);
  }

  getByid(id: number): Observable<AtuacaoProfissional> {
    return this.http.get<AtuacaoProfissional>(`${EOCCET_API}/atuacoes-profissionais/${id}`);
  }

  save(atuacaoProfissional: AtuacaoProfissional): Observable<AtuacaoProfissional> {

    return this.http.post<AtuacaoProfissional>(`${EOCCET_API}/atuacoes-profissionais`, atuacaoProfissional);
  }

  update(id: number, atuacaoProfissional: AtuacaoProfissional): Observable<AtuacaoProfissional> {
    return this.http.put<AtuacaoProfissional>(`${EOCCET_API}/atuacoes-profissionais/${id}`, atuacaoProfissional);
  }
}
