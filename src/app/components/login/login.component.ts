import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

declare var window: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() title = 'Login';

  modal: any;
  form: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {

    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });

  }

  get username() { return this.form.get('username'); }
  get password() { return this.form.get("password"); }
  get formIsInValid() { return this.form.invalid; }

  ngOnInit(): void {
    this.modal = new window.bootstrap.Modal(
      document.getElementById("modalLogin")
    );
  }

  onLogin() {
    try {
      this.authService.login(this.form.value).subscribe({
        next: (response) => {
          this.closeModal();
          this.clearForm();
          this.toastrService.success(`Login exitoso!`);
        },
        error: (err) => this.toastrService.error('Hubo un error al comprobar el usuario!')
      });
    } catch (error) {
      this.toastrService.error('Error!', (error as Error).message);
    }
  }

  onCancel() {
    this.clearForm();
  }

  clearForm() {
    this.form.reset();
  }

  closeModal() {
    this.modal.hide();
  }

}
