import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coord-auth',
  templateUrl: './coord-auth.component.html',
  styleUrls: ['./coord-auth.component.css']
})
export class CoordAuthComponent implements OnInit {

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
      cpf: this.formBuilder.control('', [Validators.required]),
      senha: this.formBuilder.control('', [Validators.required])
    });

    this.navigateTo = this.activatedRoute.snapshot.params['to'];
  }

  login() {

    if (this.loginForm.valid) {

    }

  }

}
