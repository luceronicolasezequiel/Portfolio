import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest } from 'src/app/models/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
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

  ngOnInit(): void { }

  onLogin() {
    try {
      const request = new LoginRequest();
      request.username = this.username?.value;
      request.password = this.password?.value;

      this.authService.login(request).subscribe({
        next: () => {
          this.closeModal();
          this.clearForm();
          this.toastrService.success(`Login exitoso!`);
        },
        error: () => this.toastrService.error('Hubo un error al comprobar el usuario!')
      });
    } catch (error) {
      this.toastrService.error('Error!', (error as Error).message);
    }
  }

  onCancel() {
    this.closeModal();
    this.clearForm();
  }

  clearForm() {
    this.form.reset();
  }

  closeModal() {
    this.activeModal.close();
  }

}
