
import { EOCCET_API } from './../../../app.api';
import { Coordenador } from './../../../models/coordenador.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class AdminCoordenadoresComponentService {

  constructor(private http: Http) {}

  coordenadores(): Observable<Coordenador[]> {

    return this.http.get(`${EOCCET_API}/coordenadores`)
    .map(response => response.json());
  }
}
