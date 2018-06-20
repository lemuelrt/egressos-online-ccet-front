import { MESSAGES } from './../../../../const/messages';
import { TipoUsuario } from './../../../../enums/tipo-usuario.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../../services/auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-egresso-auth-forgot',
  templateUrl: './egresso-auth-forgot.component.html',
  styleUrls: ['./egresso-auth-forgot.component.css']
})
export class EgressoAuthForgotComponent implements OnInit {

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
    if (this.authService.isLoggedIn(TipoUsuario.EGRESSO)) {
      this.router.navigate(['']);
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
      this.authService.forgot(this.forgotForm.get('email').value, TipoUsuario.EGRESSO)
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
