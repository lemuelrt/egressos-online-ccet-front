import { DialogConfirmationComponent } from './../../shared/dialog-confirmation/dialog-confirmation.component';
import { CoordenadorService } from './../../../services/coordenador.service';

/**  Adicionei os imports necessários para consumir o service de http
 *
import { AdminCoordenadoresComponentService } from './admin-coordenadores.component.service';
import { EOCCET_API } from './../../../app.api';

*/
import { LeftPadPipe } from 'ngx-pipes';

import { Component, OnInit } from '@angular/core';

import { Coordenador } from './../../../models/coordenador.model';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { MESSAGES } from '../../../const/messages';

@Component({
  selector: 'app-admin-coordenadores',
  templateUrl: './admin-coordenadores.component.html',
  styleUrls: ['./admin-coordenadores.component.css'],
  providers: [LeftPadPipe]
})
export class AdminCoordenadoresComponent implements OnInit {

  /*  para quando retirar os dados estáticos

  coordenadores: Coordenador[];
  */

  coordenadores: Coordenador[] = [];

  constructor(
    private _lpad: LeftPadPipe,
    private toastr: ToastrService,
    private coordenadorService: CoordenadorService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {

    this.coordenadorService.list().subscribe(
      (coordenadores) => {
        // console.log(coordenadores);
        this.coordenadores = coordenadores;
      }
    );

  }

  formatCpf(cpf): string {
    const cpf_ = this._lpad.transform(cpf.toString(), 11, '0');

    return cpf_.substring(0, 3) + '.' + cpf_.substring(3, 6) + '.' + cpf_.substring(6, 9) + '-' + cpf_.substring(9, 11);
  }

  confirmInactivation(id) {

    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: 'auto',
      autoFocus: false,
      data: { msg: MESSAGES['M015'] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const coordenador = this.coordenadores.find((c) => c.coordenadorId === id);
        coordenador.coordenadorStatus = 2;
        coordenador.coordenadorSenha = '';

        this.coordenadorService.update(id, coordenador).subscribe(
          (respnse) => {
            this.toastr.success(MESSAGES['M012']);
            this.coordenadores = this.coordenadores.filter((c2) => c2.coordenadorId !== id);
          }
        );
      }
    });
  }

}
