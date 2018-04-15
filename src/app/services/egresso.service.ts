import { Egresso } from './../models/egresso.model';
import { EOCCET_API } from './../app.api';
import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
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

  // tslint:disable-next-line:member-ordering
  saveAll(egressos: Egresso[]): Observable<Egresso[]> {
    return this.http.post<Egresso[]>(`${EOCCET_API}/egresso/egressos`, egressos);
  }

  updateWithFormData(form: FormData, id: number): Observable<any> {


    return this.http.post<any>(`${EOCCET_API}/egresso/atualizar-ft-perfil/${id}`, form);

/*
    const req = new HttpRequest('POST', `${EOCCET_API}/egresso/atualizar/${id}`, form, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
*/
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
