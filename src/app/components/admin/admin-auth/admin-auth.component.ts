import { MESSAGES } from './../../../const/messages';
import { NgxSpinnerService } from 'ngx-spinner';
import { TipoUsuario } from './../../../enums/tipo-usuario.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent implements OnInit {

  senha_hide = true;
  loginForm: FormGroup;
  navigateTo: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {
    if (this.authService.isLoggedIn(TipoUsuario.ADMIN)) {
      this.router.navigate(['/admin']);
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
        TipoUsuario.ADMIN, null)
        .finally(() => this.spinner.hide())
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
