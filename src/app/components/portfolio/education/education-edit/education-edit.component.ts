import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Education, UpdateEducationRequest } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-education-edit',
  templateUrl: './education-edit.component.html',
  styleUrls: ['./education-edit.component.css']
})
export class EducationEditComponent implements OnInit {

  @Input() education!: Education;

  form: FormGroup;
  
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private educationService: EducationService,
    private globalService: GlobalService,
    private toastrService: ToastrService
  ) {
    
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      organization: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      periodFrom: ['', [Validators.required]],
      periodTo: ['']
    });

  }

  get id() { return this.form.get('id'); }
  get organization() { return this.form.get('organization'); }
  get title() { return this.form.get('title'); }
  get periodFrom() { return this.form.get('periodFrom'); }
  get periodTo() { return this.form.get('periodTo'); }
  get formIsInValid() { return this.form.invalid; }

  ngOnInit(): void {
    this.form.get('id')?.setValue(this.education.id);
    this.form.get('organization')?.setValue(this.education.organization);
    this.form.get('title')?.setValue(this.education.title);
    this.form.get('periodFrom')?.setValue(this.globalService.parseDate(this.education.periodFrom));
    this.form.get('periodTo')?.setValue(this.globalService.parseDate(this.education.periodTo));
  }

  onSave() {
    try {
      const request = new UpdateEducationRequest();
      request.id = this.id?.value;
      request.organization = this.organization?.value;
      request.title = this.title?.value;
      request.periodFrom = this.periodFrom?.value;
      request.periodTo = this.periodTo?.value;

      this.educationService.create(request).subscribe({
        next: (response) => {
          this.closeModalWithData(response);
          this.clearForm();
          this.toastrService.success('Educación actualizada con éxito!');
        },
        error: (err) => this.toastrService.error('Hubo un error al actualizar la educación!')
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
