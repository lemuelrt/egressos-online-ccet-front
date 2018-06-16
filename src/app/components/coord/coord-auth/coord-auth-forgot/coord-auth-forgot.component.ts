import { AuthService } from './../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.forgotForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required]),

    });

    this.navigateTo = this.activatedRoute.snapshot.params['to'];
  }

  login() {

    if (this.forgotForm.valid) {

    }

  }

}
