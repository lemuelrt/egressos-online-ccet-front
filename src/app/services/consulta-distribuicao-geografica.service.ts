import { EOCCET_API } from './../app.api';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConsultaDistribuicaoGeografica } from '../models/consulta-distribuicao-geografica.model';

@Injectable()
export class ConsultaDistribuicaoGeograficaService {

  constructor(private http: HttpClient) { }

  consulta(anosIngresso: string[], anosConclusao: string[]): Observable<ConsultaDistribuicaoGeografica[]> {

    const params = {
      anosIngresso: anosIngresso,
      anosConclusao: anosConclusao
    };

    console.log(params);
    return this.http.post<ConsultaDistribuicaoGeografica[]>(`${EOCCET_API}/consulta/distribuicao-geografica`, params);
  }
}
