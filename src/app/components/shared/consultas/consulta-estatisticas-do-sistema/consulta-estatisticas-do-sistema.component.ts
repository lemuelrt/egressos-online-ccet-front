import { Component, OnInit } from '@angular/core';
import { ConsultaEstatisticasDoSistema } from '../../../../models/consulta-estatisticas-do-sistema.model';
import { ConsultaEstatisticasDoSistemaService } from '../../../../services/consulta-estatisticas-do-sistema.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MESSAGES } from '../../../../const/messages';

@Component({
  selector: 'app-consulta-estatisticas-do-sistema',
  templateUrl: './consulta-estatisticas-do-sistema.component.html',
  styleUrls: ['./consulta-estatisticas-do-sistema.component.css']
})
export class ConsultaEstatisticasDoSistemaComponent implements OnInit {


  title = 'Consulta de estatísticas do sistema';
  msg039 = MESSAGES.M039;
  msg040 = MESSAGES.M040;
  msg041 = MESSAGES.M041;


  consultasEstatisticasDoSistema: ConsultaEstatisticasDoSistema[] = [];


  constructor(
    private consultaESService: ConsultaEstatisticasDoSistemaService,
    private spinner: NgxSpinnerService
  ) { }


  ngOnInit() {
    this.consultar();
  }


  consultar() {

    this.spinner.show();

    this.consultaESService.consultar()
      .finally(() => this.spinner.hide())
      .subscribe(
        (result) => {
          this.consultasEstatisticasDoSistema = result;
        }
      );
  }


  // retorna o total (quantidade) de egressos por consulta

  totalEgressos(ces: ConsultaEstatisticasDoSistema[]) {

    let total = 0;

    if (ces) {
      total = ces.map(item => item.qtdEgressos)
        .reduce((prev, value) => prev + value, 0);
    }
    return total;
  }


  // retorna o total de egressos atualizados por consulta

  totalAtualizados(ces: ConsultaEstatisticasDoSistema[]) {

    let total = 0;

    if (ces) {
      total = ces.map(item => item.atualizados)
        .reduce((prev, value) => prev + value, 0);
    }
    return total;
  }


  // retorna o percentual de atualizados por consulta

  percentualAtualizados(ces: ConsultaEstatisticasDoSistema[]) {
    const totalEgressos = this.totalAtualizados(ces);

    const total = ces.map(item => item.qtdEgressos)
      .reduce((prev, value) => prev + value, 0);

    return totalEgressos / total * 100;
  }


  // retorna o percentual de atualizados por ano-linha

  percentualAtualizadosPorAno(ces: ConsultaEstatisticasDoSistema) {

    return (ces.atualizados / ces.qtdEgressos * 100).toFixed(2);
  }

}
