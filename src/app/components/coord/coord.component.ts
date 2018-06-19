import { UsuarioDto } from './../../models/usuario-dto.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coord',
  templateUrl: './coord.component.html',
  styleUrls: ['./coord.component.css']
})
export class CoordComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  getNomeUsuario() {
    const usuarioDto: UsuarioDto = this.auth.getAuthenticated();

    return (usuarioDto !== undefined) ? usuarioDto.nome : '';

  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/coord/auth']);
  }
}
