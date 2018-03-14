import { DialogConfirmationComponent } from './../../shared/dialog-confirmation/dialog-confirmation.component';
import { CoordenadorService } from './../../../services/coordenador.service';

/**  Adicionei os imports necessários para consumir o service de http
 *
import { AdminCoordenadoresComponentService } from './admin-coordenadores.component.service';
import { EOCCET_API } from './../../../app.api';

*/

import { Component, OnInit } from '@angular/core';

import { Coordenador } from './../../../models/coordenador.model';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { MESSAGES } from '../../../const/messages';

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
    private toastr: ToastrService,
    private coordenadorService: CoordenadorService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    this.coordenadorService.list().subscribe(
      (coordenadores) => {
        // console.log(coordenadores);
        this.coordenadores = coordenadores;
      }
    );

  }

  confirmInactivation(id) {

    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: 'auto',
      autoFocus: false,
      data: { msg: MESSAGES['M016'] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const coordenador = this.coordenadores.find((c) => c.coordenadorId === id);
        coordenador.coordenadorStatus = 2;
        coordenador.coordenadorSenha = '';

        this.coordenadorService.update(id, coordenador).subscribe(
          (respnse) => {
            this.toastr.success(MESSAGES['M010']);
            this.coordenadores = this.coordenadores.filter((c2) => c2.coordenadorId !== id);
          }
        );
      }
    });
  }

}
