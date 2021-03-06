import { EOCCET_API } from './../app.api';
import { Coordenador } from './../models/coordenador.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CoordenadorService {

  constructor(private http: HttpClient) { }

  list(): Observable<Coordenador[]> {

    return this.http.get<Coordenador[]>(`${EOCCET_API}/coordenadores`);
  }

  getByid(id: number): Observable<Coordenador> {
    return this.http.get<Coordenador>(`${EOCCET_API}/coordenadores/${id}`);
  }

  save(coordenador: Coordenador): Observable<Coordenador> {

    return this.http.post<Coordenador>(`${EOCCET_API}/coordenadores`, coordenador);
  }

  update(id: number, coordenador: Coordenador): Observable<Coordenador> {
    return this.http.put<Coordenador>(`${EOCCET_API}/coordenadores/${id}`, coordenador);
  }
}
