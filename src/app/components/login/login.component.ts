import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare var window: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() title = 'Login';

  formModal: any;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {

    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });

  }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("modalLogin")
    );
  }

  get username() { return this.form.get('username'); }
  get password() { return this.form.get("password"); }

  onLogin(event: Event) {
    event.preventDefault; // cancel event of moment

    this.authService.login(this.form.value).subscribe(
      data => {
        this.formModal.hide();
      }, error => {
        console.log('Hubo un error al comprobar el usuario!');
      }
    );
  }

}
