
/**  Adicionei os imports necessários para consumir o service de http
 *
import { AdminCoordenadoresComponentService } from './admin-coordenadores.component.service';
import { EOCCET_API } from './../../../app.api';

*/

import { Component, OnInit } from '@angular/core';

import { Coordenador } from './../../../models/coordenador.model';

@Component({
  selector: 'app-admin-coordenadores',
  templateUrl: './admin-coordenadores.component.html',
  styleUrls: ['./admin-coordenadores.component.css']
})
export class AdminCoordenadoresComponent implements OnInit {

  /*  para quando retirar os dados estáticos

  coordenadores: Coordenador[];
  */

  coordenadores: Coordenador[] = [
    {
      coordenadirId: 1,
      coordenadorCpf: 83073673145,
      coordenadorNome: 'Marco Aurelio',
      coordenadorEmail: 'marco.aurelio@email.com',
      coordenadorStatus: 1,
      coordenadorOferta: {
        ofertaCampus: {
          campusId: 1,
          campusNome: 'UEG CCET'
        },
        ofertaCurso: {
          cursoId: 1,
          cursoNome: 'Sistemas de Informação'
        }
      }
    },
    {
      coordenadirId: 1,
      coordenadorCpf: 75145115222,
      coordenadorNome: 'Pedro Paulo',
      coordenadorEmail: 'pedro.pp@email.com',
      coordenadorStatus: 1,
      coordenadorOferta: {
        ofertaCampus: {
          campusId: 1,
          campusNome: 'UEG CCET'
        },
        ofertaCurso: {
          cursoId: 1,
          cursoNome: 'Tecnologia em Processamento de Dados'
        }
      }
    }
  ];

  constructor() { }

  ngOnInit() {

  }
/*
uma das formas de chamar o service para consumir a  api (também criei uma classe de service para separar as
resposabilidades)

  constructor(private coordenadorService: AdminCoordenadoresComponentService) { }

  ngOnInit() {
    this.coordenadorService.coordenadores()
    .subscribe(coordenadores => this.coordenadores = coordenadores);
  }
*/
}
