import { RedeAluno } from './../models/rede-aluno.model';
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

  updateFotoPerfil(form: FormData, id: number): Observable<any> {

    return this.http.post<any>(`${EOCCET_API}/egresso/atualizar-foto-perfil/${id}`, form);

  }

  updateDadosPessoais(egresso: Egresso, id: number): Observable<Egresso> {
    return this.http.post<Egresso>(`${EOCCET_API}/egresso/atualizar-dados-pessoais/${id}`, egresso);
  }

  getByid(id: number): Observable<Egresso> {
    return this.http.get<Egresso>(`${EOCCET_API}/egresso/${id}`);
  }

  updateGaleria(form: FormData, id: number): Observable<any> {

    return this.http.post<any>(`${EOCCET_API}/egresso/atualizar-fotos-galeria/${id}`, form);

  }

  updateRedeSocial(redeAluno: RedeAluno, id: number): Observable<any> {

    return this.http.post<any>(`${EOCCET_API}/egresso/atualizar-rede-social/${id}`, redeAluno);

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
