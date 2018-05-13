import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EOCCET_API } from '../app.api';

@Injectable()
export class ConsultaFaixaSalarialService {

  constructor(private http: HttpClient) { }

  consulta(anosIngresso: string[], anosConclusao: string[], setor: string[]): Observable <any[]> {

    const params = {
      anosIngresso  : anosIngresso,
      anosConclusao : anosConclusao,
      setor         : setor
    };

    return this.http.post<any[]>(`${EOCCET_API}/consulta/faixa-salarial`, params);
  }


}
