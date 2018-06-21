import { MESSAGES } from './../../../const/messages';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TipoUsuario } from '../../../enums/tipo-usuario.enum';

@Component({
  selector: 'app-coord-auth',
  templateUrl: './coord-auth.component.html',
  styleUrls: ['./coord-auth.component.css']
})
export class CoordAuthComponent implements OnInit {

  senha_hide = true;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {
    if (this.authService.isLoggedIn(TipoUsuario.COORD)) {
      this.router.navigate(['/coord']);
    }

  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      cpf: this.formBuilder.control('', [Validators.required]),
      senha: this.formBuilder.control('', [Validators.required])
    });

  }

  hasError(name: string): boolean {
    return this.loginForm.get(name).errors && this.loginForm.get(name).touched;
  }

  getControl(name: string): AbstractControl {
    return this.loginForm.get(name);
  }

  login() {

    if (this.loginForm.valid) {
      this.spinner.show();
      this.authService.authenticate(
        this.loginForm.get('cpf').value,
        this.loginForm.get('senha').value,
        TipoUsuario.COORD, null)
        .finally(() => this.spinner.hide() )
        .subscribe(
          (response) => {
            this.toastr.success(MESSAGES['M036']);
            this.authService.successfulLogin(response.headers.get('Authorization'), JSON.parse(response.body));

          },
          (error) => {
            this.toastr.error(MESSAGES['M037']);
          }
        );
    }

  }

}
