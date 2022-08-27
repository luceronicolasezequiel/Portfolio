import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CreateProyectRequest, Proyect } from 'src/app/models/proyect';
import { ProyectService } from 'src/app/services/proyect.service';

@Component({
  selector: 'app-proyect-add',
  templateUrl: './proyect-add.component.html',
  styleUrls: ['./proyect-add.component.css']
})
export class ProyectAddComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private proyectService: ProyectService,
    private toastrService: ToastrService
  ) {
    
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      dateRealization: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
      urls: ['', [Validators.minLength(5), Validators.maxLength(400)]]
    });

  }

  get name() { return this.form.get('name'); }
  get dateRealization() { return this.form.get('dateRealization'); }
  get description() { return this.form.get('description'); }
  get urls() { return this.form.get('urls'); }
  get formIsInValid() { return this.form.invalid; }

  ngOnInit(): void {
  }

  onSave() {
    try {
      this.loading = true;

      const request = new CreateProyectRequest();
      request.name = this.name?.value;
      request.dateRealization = this.dateRealization?.value;
      request.description = this.description?.value;
      request.urls = (this.urls?.value).trim() != '' ? this.urls?.value : null;

      this.proyectService.create(request).subscribe({
        next: (response) => {
          this.closeModalWithData(response);
          this.clearForm();
          this.toastrService.success('Proyecto registrado con éxito!');
          this.loading = false;
        },
        error: (err) => {
          this.toastrService.error('Hubo un error al registrar el proyecto!');
          this.loading = false;
        }
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

  closeModalWithData(proyect: Proyect) {
    this.activeModal.close(proyect);
  }

}
