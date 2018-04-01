import { Egresso } from './../models/egresso.model';
import { EOCCET_API } from './../app.api';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EgressoService {

  constructor(private http: HttpClient) {}

  save(egresso: Egresso): Observable<Egresso> {

    return this.http.post<Egresso>(`${EOCCET_API}/egresso`, egresso);
  }


}
