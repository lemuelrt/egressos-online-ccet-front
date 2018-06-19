import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TipoUsuario } from '../../../../enums/tipo-usuario.enum';

@Component({
  selector: 'app-coord-auth-forgot',
  templateUrl: './coord-auth-forgot.component.html',
  styleUrls: ['./coord-auth-forgot.component.css']
})
export class CoordAuthForgotComponent implements OnInit {

  senha_hide = true;
  forgotForm: FormGroup;
  navigateTo: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {
    if (this.authService.isLoggedIn(TipoUsuario.COORD)) {
      this.router.navigate(['/coord']);
    }
  }

  ngOnInit() {

    this.forgotForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required]),

    });

  }

  forgot() {



    if (this.forgotForm.valid) {
      this.spinner.show();
      this.authService.forgot(this.forgotForm.get('email').value, TipoUsuario.COORD)
        .finally(() => this.spinner.hide())
        .subscribe(
          (response) => {
            this.toastr.success('Foi enviado os dados de recuperação da conta para o e-mail.');
          }
        );
    }

  }

}
