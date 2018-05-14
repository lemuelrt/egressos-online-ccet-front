import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EOCCET_API } from '../app.api';
import { ConsultaAtuacaoProfissional } from '../models/consulta-atuacao-profissional.model';

@Injectable()
export class ConsultaAtuacaoProfissionalService {

  constructor(private http: HttpClient) { }

  consulta(anosIngresso: string[], anosConclusao: string[], setorAtuacao: number): Observable <ConsultaAtuacaoProfissional[]> {

    const params = {
      anosIngresso  : anosIngresso,
      anosConclusao : anosConclusao,
      setorAtuacao  : setorAtuacao
    };

    return this.http.post<ConsultaAtuacaoProfissional[]>(`${EOCCET_API}/consulta/atuacao-profissional`, params);
  }


}
