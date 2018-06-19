import { UsuarioDto } from './../../models/usuario-dto.model';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private auth: AuthService, private router: Router
  ) { }

  ngOnInit() {

  }

  getNomeUsuario() {
    const usuarioDto: UsuarioDto = this.auth.getAuthenticated();

    return (usuarioDto !== undefined) ? usuarioDto.nome : '';

  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/admin/auth']);
  }

}
