import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {

  senha_hide = true;
  loginForm: FormGroup;
  navigateTo: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      user: this.formBuilder.control('', [Validators.required]),
      senha: this.formBuilder.control('', [Validators.required])
    });

    this.navigateTo = this.activatedRoute.snapshot.params['to'];
  }

  login() {

    if (this.loginForm.valid) {

    }

  }

}
