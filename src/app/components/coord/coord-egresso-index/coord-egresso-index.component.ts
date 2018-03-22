import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coord-egresso-index',
  templateUrl: './coord-egresso-index.component.html',
  styleUrls: ['./coord-egresso-index.component.css']
})
export class CoordEgressoIndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {

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

}
