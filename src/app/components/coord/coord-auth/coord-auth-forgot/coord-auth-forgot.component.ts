import { MESSAGES } from './../../../../const/messages';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
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

  hasError(name: string): boolean {
    return this.forgotForm.get(name).errors && this.forgotForm.get(name).touched;
  }

  getControl(name: string): AbstractControl {
    return this.forgotForm.get(name);
  }

  forgot() {



    if (this.forgotForm.valid) {
      this.spinner.show();
      this.authService.forgot(this.forgotForm.get('email').value, TipoUsuario.COORD)
        .finally(() => this.spinner.hide())
        .subscribe(
          (response) => {
            this.toastr.success(MESSAGES['M038']);
          },
          (error) => {
            this.toastr.error(MESSAGES['M0039']);
          }
        );
    }

  }

}
