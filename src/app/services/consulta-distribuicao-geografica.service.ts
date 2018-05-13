import { EOCCET_API } from './../app.api';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConsultaDistribuicaoGeograficaService {

  constructor(private http: HttpClient) { }

  consulta(anosIngresso: string[], anosConclusao: string[]): Observable<any[]> {

    const params = {
      anosIngresso: anosIngresso,
      anosConclusao: anosConclusao
    };

    console.log(params);
    return this.http.post<any[]>(`${EOCCET_API}/consulta/distribuicao-geografica`, params);
  }
}
