import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(

  ) { }

  ngOnInit() {
    $(document).ready(() => {

      const b: any = $('body');
      b.layout('fix');

    });
  }

}
