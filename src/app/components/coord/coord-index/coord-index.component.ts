import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coord-index',
  templateUrl: './coord-index.component.html',
  styleUrls: ['./coord-index.component.css']
})
export class CoordIndexComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
    console.log('Tempo mínimo de integralização: ' + this.auth.getAuthenticated().tempoMinimoIntegralizacao);
  }

}
