import { Component, OnInit, AfterViewInit } from '@angular/core';
import { error } from 'util';
import { $ } from 'protractor';
import { PapaParseService, PapaParseModule } from 'ngx-papaparse';

@Component({
  selector: 'app-coord-egresso-index',
  templateUrl: './coord-egresso-index.component.html',
  styleUrls: ['./coord-egresso-index.component.css']
})
export class CoordEgressoIndexComponent implements OnInit, AfterViewInit {


  constructor(private papa: PapaParseService) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {


    // -------------add de Event para o btn Importar arquivo ------------------------

    // tslint:disable-next-line:prefer-const
    let fileSelect = document.getElementById('fileSelect'),
      // tslint:disable-next-line:prefer-const
      fileElem = document.getElementById('fileElem');

    fileSelect.addEventListener('click', function (e) {
      if (fileElem) {
        fileElem.click();
      }
    }, false);


  }

  // -------------método responsável por ler o arquivo csv e retornar um objeto --------------------------

  importCsv(event: any) {

    const file: File = event.target.files[0];

    this.papa.parse(file, {
      complete: (results, file2) => {

        // Após importar e retornar o objeto, será passado para uma constante (service)
        // e redirecionado para o component coord-egresso-import para a criação dos itens
        console.log('Parsed: ', results, file2);
      }
    });

  }
}
