import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConsultaEstatisticasDoSistema } from '../models/consulta-estatisticas-do-sistema.model';
import { Observable } from 'rxjs/Observable';
import { EOCCET_API } from '../app.api';

@Injectable()
export class ConsultaEstatisticasDoSistemaService {

  constructor(private http: HttpClient) { }

  consultar(): Observable<ConsultaEstatisticasDoSistema[]> {

    return this.http.post<ConsultaEstatisticasDoSistema[]>(`${EOCCET_API}/consulta/estatistica-do-sistema`, {});
  }

}
