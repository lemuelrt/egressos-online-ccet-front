import { UsuarioDto } from './../../models/usuario-dto.model';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TipoUsuario } from '../../enums/tipo-usuario.enum';

@Component({
  selector: 'app-egresso',
  templateUrl: './egresso.component.html',
  styleUrls: ['./egresso.component.css']
})
export class EgressoComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  getNomeUsuario() {
    const usuarioDto: UsuarioDto = this.auth.getAuthenticated();

    return (usuarioDto !== undefined) ? usuarioDto.nome : '';

  }

  logout() {
    this.auth.logout(TipoUsuario.EGRESSO);
  }
}
