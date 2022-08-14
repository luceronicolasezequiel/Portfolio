import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CreateExperienceRequest, Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-experience-add',
  templateUrl: './experience-add.component.html',
  styleUrls: ['./experience-add.component.css']
})
export class ExperienceAddComponent implements OnInit {

  form: FormGroup;
  
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private experienceService: ExperienceService,
    private toastrService: ToastrService
  ) {
    this.form = this.formBuilder.group({
      position: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      organization: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      periodFrom: ['', [Validators.required]],
      periodTo: ['']
    });
  }

  get position() { return this.form.get('position'); }
  get organization() { return this.form.get('organization'); }
  get periodFrom() { return this.form.get('periodFrom'); }
  get periodTo() { return this.form.get('periodTo'); }
  get formIsInValid() { return this.form.invalid; }

  ngOnInit(): void { }

  onSave() {
    try {
      const request = new CreateExperienceRequest();
      request.position = this.position?.value;
      request.organization = this.organization?.value;
      request.periodFrom = this.periodFrom?.value;
      request.periodTo = this.periodTo?.value;

      this.experienceService.create(request).subscribe({
        next: (response) => {
          this.closeModalWithData(response);
          this.clearForm();
          this.toastrService.success(`Experiencia registrada con éxito!`);
        },
        error: (err) => this.toastrService.error('Hubo un error al registrar la experiencia!')
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

  closeModalWithData(experience: Experience) {
    this.activeModal.close(experience);
  }

}
