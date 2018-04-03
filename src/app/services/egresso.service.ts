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

  egressosImportados: Egresso[] = [];

  constructor(private http: HttpClient) { }

  save(egresso: Egresso): Observable<Egresso> {

    return this.http.post<Egresso>(`${EOCCET_API}/egresso`, egresso);
  }

  setEgressosImportados(data: any) {
    this.egressosImportados = [];
    if (data instanceof Array) {
      for (let i = 1; i < data.length; i++) {
        if (data[i].length === 4) {
          this.egressosImportados.push({
            egressoAnoIngresso: data[i][2],
            egressoAnoConclusao: data[i][3],
            aluno: {
              alunoNome: data[i][0],
              alunoCpf: data[i][1]
            }
          });
        }
      }
    }
  }




}
