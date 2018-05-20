import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EOCCET_API } from '../app.api';
import { ConsultaFormacaoAcademica } from '../models/consulta-formacao-academica.model';

@Injectable()
export class ConsultaFormacaoAcademicaService {

  constructor(private http: HttpClient) { }

  consulta(anosIngresso: string[], anosConclusao: string[]): Observable <ConsultaFormacaoAcademica[]> {

    const params = {
      anosIngresso  : anosIngresso,
      anosConclusao : anosConclusao
    };

    return this.http.post<ConsultaFormacaoAcademica[]>(`${EOCCET_API}/consulta/formacao-academica`, params);
  }


}
