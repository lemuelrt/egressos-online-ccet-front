import { DialogConfirmationComponent } from './../../shared/dialog-confirmation/dialog-confirmation.component';

/**  Adicionei os imports necessários para consumir o service de http
 *
import { AdminCoordenadoresComponentService } from './admin-coordenadores.component.service';
import { EOCCET_API } from './../../../app.api';

*/
// import { LeftPadPipe } from 'ngx-pipes';

import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { MESSAGES } from '../../../const/messages';
import { AtuacaoProfissional } from '../../../models/atuacao-profissional.model';
import { AtuacaoProfissionalService } from '../../../services/atuacao-profissional.service';

@Component({
  selector: 'app-coord-atuacao-profissional-index',
  templateUrl: './coord-atuacao-profissional-index.component.html',
  styleUrls: ['./coord-atuacao-profissional-index.component.css'],
  // providers: [LeftPadPipe]
})
export class CoordAtuacaoProfissionalIndexComponent implements OnInit {

  /*  para quando retirar os dados estáticos

  atuacoesProfissionais: AtuacaoProfissional[];
  */

  atuacoesProfissionais: AtuacaoProfissional[] = [];

  constructor(
    // private _lpad: LeftPadPipe,
    private toastr: ToastrService,
    private atuacaoProfissionalService: AtuacaoProfissionalService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    this.atuacaoProfissionalService.list().subscribe(
      (atuacoesProfissionais) => {
        console.log(atuacoesProfissionais);
        this.atuacoesProfissionais = atuacoesProfissionais;
      }
    );

  }

  confirmInactivation(id) {

    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: 'auto',
      autoFocus: false,
      data: { msg: MESSAGES['M018'] } // ARRUMAR A MENSAGEM
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const atuacaoProfissional = this.atuacoesProfissionais.find((ap) => ap.atuacaoProfissionalId === id);
        atuacaoProfissional.atuacaoProfissionalStatus = 2;

        this.atuacaoProfissionalService.update(id, atuacaoProfissional).subscribe(
          (respnse) => {
            this.toastr.success(MESSAGES['M015']);
            this.atuacoesProfissionais = this.atuacoesProfissionais.filter((ap2) => ap2.atuacaoProfissionalId !== id);
          }
        );
      }
    });
  }
}
