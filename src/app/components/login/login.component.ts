import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() title = 'INICIAR SESIÓN';

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      deviceInfo: this.formBuilder.group({
        deviceId: ["17867868768"],
        deviceType: ["DEVICE_TYPE_ANDROID"],
        notificationToken: ["6765757eececc34"]
      })
    });

  }

  ngOnInit(): void {
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get("password"); }

  onLogin(event: Event) {
    event.preventDefault; // cancel event of moment

    this.authService.login(this.form.value).subscribe(data => {
      console.log("Data: " + JSON.stringify(data));
      this.router.navigate(['/portfolio']); // if get data, redirect to portfolio
    });
  }
}
