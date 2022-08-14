import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PersonalInformation, UpdateSummaryRequest } from 'src/app/models/personal-information';
import { PersonalInformationService } from 'src/app/services/personal-information.service';

@Component({
  selector: 'app-about-me-edit',
  templateUrl: './about-me-edit.component.html',
  styleUrls: ['./about-me-edit.component.css']
})
export class AboutMeEditComponent implements OnInit {

  @Input() personalInformation!: PersonalInformation;

  form: FormGroup;
  
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private personalInformationService: PersonalInformationService,
    private toastrService: ToastrService
  ) {

    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      summary: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]]
    });

  }

  get id() { return this.form.get('id'); }
  get summary() { return this.form.get('summary'); }
  get formIsInValid() { return this.form.invalid; }

  ngOnInit(): void {
    this.form.get('id')?.setValue(this.personalInformation.id);
    this.form.get('summary')?.setValue(this.personalInformation.summary);
  }

  onSave() {
    try {
      const request = new UpdateSummaryRequest();
      request.id = this.id?.value;
      request.summary = this.summary?.value;

      this.personalInformationService.updateSummary(request).subscribe({
        next: (response) => {
          this.closeModalWithData(response);
          this.clearForm();
          this.toastrService.success(`Datos personales actualizados con éxito!`);
        },
        error: (err) => this.toastrService.error('Hubo un error al comprobar la información personal!')
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

  closeModalWithData(personalInformation: PersonalInformation) {
    this.activeModal.close(personalInformation);
  }

}
