import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CreateEducationRequest, Education } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-education-add',
  templateUrl: './education-add.component.html',
  styleUrls: ['./education-add.component.css']
})
export class EducationAddComponent implements OnInit {

  form: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private educationService: EducationService,
    private toastrService: ToastrService
  ) {

    this.form = this.formBuilder.group({
      organization: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      periodFrom: ['', [Validators.required]],
      periodTo: ['']
    });

  }

  get organization() { return this.form.get('organization'); }
  get title() { return this.form.get('title'); }
  get periodFrom() { return this.form.get('periodFrom'); }
  get periodTo() { return this.form.get('periodTo'); }
  get formIsInValid() { return this.form.invalid; }

  ngOnInit(): void {
  }

  onSave() {
    try {
      const request = new CreateEducationRequest();
      request.organization = this.organization?.value;
      request.title = this.title?.value;
      request.periodFrom = this.periodFrom?.value;
      request.periodTo = this.periodTo?.value;

      this.educationService.create(request).subscribe({
        next: (response) => {
          this.closeModalWithData(response);
          this.clearForm();
          this.toastrService.success('Educación registrada con éxito!');
        },
        error: (err) => this.toastrService.error('Hubo un error al registrar la educación!')
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

  closeModalWithData(education: Education) {
    this.activeModal.close(education);
  }

}
