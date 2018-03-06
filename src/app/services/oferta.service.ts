import { EOCCET_API } from './../app.api';
import { Coordenador } from './../models/coordenador.model';
import { Observable } from 'rxjs/Observable';
import { Oferta } from './../models/oferta.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OfertaService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Oferta[]> {
    return this.http.get<Oferta[]>(`${EOCCET_API}/ofertas`);
  }

}
