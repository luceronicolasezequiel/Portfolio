import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CreateHabilityRequest, Hability } from 'src/app/models/hability';
import { HabilityService } from 'src/app/services/hability.service';

@Component({
  selector: 'app-hability-add',
  templateUrl: './hability-add.component.html',
  styleUrls: ['./hability-add.component.css']
})
export class HabilityAddComponent implements OnInit {

  form: FormGroup;
  
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private habilityService: HabilityService,
    private toastrService: ToastrService
  ) {

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      percentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });

  }

  get name() { return this.form.get('name'); }
  get percentage() { return this.form.get('percentage'); }
  get formIsInValid() { return this.form.invalid; }

  ngOnInit(): void { }

  onSave() {
    try {
      const request = new CreateHabilityRequest();
      request.name = this.name?.value;
      request.percentage = this.percentage?.value;

      this.habilityService.create(request).subscribe({
        next: (response) => {
          this.closeModalWithData(response);
          this.clearForm();
          this.toastrService.success('Habilidad registrada con éxito!');
        },
        error: (err) => this.toastrService.error('Hubo un error al registrar la habilidad!')
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
