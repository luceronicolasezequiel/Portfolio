import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Hability, UpdateHabilityRequest } from 'src/app/models/hability';
import { GlobalService } from 'src/app/services/global.service';
import { HabilityService } from 'src/app/services/hability.service';

@Component({
  selector: 'app-hability-edit',
  templateUrl: './hability-edit.component.html',
  styleUrls: ['./hability-edit.component.css']
})
export class HabilityEditComponent implements OnInit {

  @Input() hability!: Hability;

  form: FormGroup;
  loading: boolean = false;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private habilityService: HabilityService,
    private toastrService: ToastrService
  ) {
    
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      percentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });

  }

  get id() { return this.form.get('id'); }
  get name() { return this.form.get('name'); }
  get percentage() { return this.form.get('percentage'); }
  get formIsInValid() { return this.form.invalid; }

  ngOnInit(): void {
    this.form.get('id')?.setValue(this.hability.id);
    this.form.get('name')?.setValue(this.hability.name);
    this.form.get('percentage')?.setValue(this.hability.percentage);
  }

  onSave() {
    try {
      this.loading = true;

      const request = new UpdateHabilityRequest();
      request.id = this.id?.value;
      request.name = this.name?.value;
      request.percentage = this.percentage?.value;

      this.habilityService.update(request).subscribe({
        next: (response) => {
          this.closeModalWithData(response);
          this.clearForm();
          this.toastrService.success('Habilidad actualizada con éxito!');
          this.loading = false;
        },
        error: (err) => {
          this.toastrService.error('Hubo un error al actualizar la habilidad!');
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

  closeModalWithData(hability: Hability) {
    this.activeModal.close(hability);
  }

}
