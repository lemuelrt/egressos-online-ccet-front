import { Component, OnInit, AfterViewInit } from '@angular/core';
import { error } from 'util';
import { $ } from 'protractor';

@Component({
  selector: 'app-coord-egresso-index',
  templateUrl: './coord-egresso-index.component.html',
  styleUrls: ['./coord-egresso-index.component.css']
})
export class CoordEgressoIndexComponent implements OnInit, AfterViewInit {


  constructor() { }

  ngOnInit() {

    }

  ngAfterViewInit(): void {


    // -------------inicio -Add Event para o btn Importar arquivo ------------------------

    // tslint:disable-next-line:prefer-const
    let fileSelect = document.getElementById('fileSelect'),
      // tslint:disable-next-line:prefer-const
      fileElem = document.getElementById('fileElem');

    fileSelect.addEventListener('click', function () {
      if (fileElem) {
        fileElem.click();
      }
    }, false);

    // -------------ifim -Add Event para o btn Importar arquivo --------------------------



    // $('input[type=file]').parse({
    //   config: {
    //     complete: function (results, file) {
    //       console.log('This file done:', file, results);
    //     }
    //   },
    //   complete: function () {
    //     console.log('All files done!');
    //   }
    // });
  }
}
