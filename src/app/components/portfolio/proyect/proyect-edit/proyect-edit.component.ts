import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Proyect, UpdateProyectRequest } from 'src/app/models/proyect';
import { GlobalService } from 'src/app/services/global.service';
import { ProyectService } from 'src/app/services/proyect.service';

@Component({
  selector: 'app-proyect-edit',
  templateUrl: './proyect-edit.component.html',
  styleUrls: ['./proyect-edit.component.css']
})
export class ProyectEditComponent implements OnInit {

  @Input() proyect!: Proyect;

  form: FormGroup;
  loading: boolean = false;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private proyectService: ProyectService,
    private globalService: GlobalService,
    private toastrService: ToastrService
  ) {
    
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      dateRealization: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
      urls: ['', [Validators.minLength(5), Validators.maxLength(400)]]
    });

  }

  get id() { return this.form.get('id'); }
  get name() { return this.form.get('name'); }
  get dateRealization() { return this.form.get('dateRealization'); }
  get description() { return this.form.get('description'); }
  get urls() { return this.form.get('urls'); }
  get formIsInValid() { return this.form.invalid; }

  ngOnInit(): void {
    this.form.get('id')?.setValue(this.proyect.id);
    this.form.get('name')?.setValue(this.proyect.name);
    this.form.get('dateRealization')?.setValue(this.globalService.parseDate(this.proyect.dateRealization));
    this.form.get('description')?.setValue(this.proyect.description);
    this.form.get('urls')?.setValue(this.proyect.urls);
  }

  onSave() {
    try {
      this.loading = true;

      const request = new UpdateProyectRequest();
      request.id = this.id?.value;
      request.name = this.name?.value;
      request.dateRealization = this.dateRealization?.value;
      request.description = this.description?.value;
      request.urls = this.urls?.value;

      this.proyectService.update(request).subscribe({
        next: (response) => {
          this.closeModalWithData(response);
          this.clearForm();
          this.toastrService.success('Proyecto actualizado con éxito!');
          this.loading = false;
        },
        error: (err) => {
          this.toastrService.error('Hubo un error al actualizar el proyecto!');
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
