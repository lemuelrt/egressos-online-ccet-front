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


    // -------------inicio -Add Event para o btn Importar arquivo ------------------------

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

  // -------------Ler o arquivo csv e retorna um objeto --------------------------

  importCsv(event: any) {

    const file: File = event.target.files[0];

    this.papa.parse(file, {
      complete: (results, file2) => {
        console.log('Parsed: ', results, file2);
      }
    });

  }
}
