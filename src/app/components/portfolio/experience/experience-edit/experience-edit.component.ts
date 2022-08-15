import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Experience, UpdateExperienceRequest } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-experience-edit',
  templateUrl: './experience-edit.component.html',
  styleUrls: ['./experience-edit.component.css']
})
export class ExperienceEditComponent implements OnInit {

  @Input() experience!: Experience;

  form: FormGroup;
  
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private experienceService: ExperienceService,
    private globalService: GlobalService,
    private toastrService: ToastrService
  ) {

    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      position: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      organization: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      periodFrom: ['', [Validators.required]],
      periodTo: ['']
    });

  }

  get id() { return this.form.get('id'); }
  get position() { return this.form.get('position'); }
  get organization() { return this.form.get('organization'); }
  get periodFrom() { return this.form.get('periodFrom'); }
  get periodTo() { return this.form.get('periodTo'); }
  get formIsInValid() { return this.form.invalid; }

  ngOnInit(): void {
    this.form.get('id')?.setValue(this.experience.id);
    this.form.get('position')?.setValue(this.experience.position);
    this.form.get('organization')?.setValue(this.experience.organization);
    this.form.get('periodFrom')?.setValue(this.globalService.parseDate(this.experience.periodFrom));
    this.form.get('periodTo')?.setValue(this.globalService.parseDate(this.experience.periodTo));
  }

  onSave() {
    try {
      const request = new UpdateExperienceRequest();
      request.id = this.id?.value;
      request.position = this.position?.value;
      request.organization = this.organization?.value;
      request.periodFrom = this.periodFrom?.value;
      request.periodTo = this.periodTo?.value;

      this.experienceService.update(request).subscribe({
        next: (response) => {
          this.closeModalWithData(response);
          this.clearForm();
          this.toastrService.success(`Experiencia actualizada con éxito!`);
        },
        error: (err) => this.toastrService.error('Hubo un error al actualizar la experiencia!')
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
