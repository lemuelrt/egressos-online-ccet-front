import { CoordenadorService } from './../../../services/coordenador.service';

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

  coordenadores: Coordenador[] = [];

  constructor(
    private _coordenadorService: CoordenadorService
  ) { }

  ngOnInit() {

    this._coordenadorService.coordenadores().subscribe(
      (coordenadores) => {
        console.log(coordenadores);
        this.coordenadores = coordenadores;
      }
    );

  }

}
