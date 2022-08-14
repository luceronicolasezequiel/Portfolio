import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PersonalInformation, UpdateFullnameAndTitleRequest } from 'src/app/models/personal-information';
import { PersonalInformationService } from 'src/app/services/personal-information.service';

@Component({
  selector: 'app-presentation-edit',
  templateUrl: './presentation-edit.component.html',
  styleUrls: ['./presentation-edit.component.css']
})
export class PresentationEditComponent implements OnInit {

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
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]]
    });

  }

  get id() { return this.form.get('id'); }
  get name() { return this.form.get('name'); }
  get surname() { return this.form.get('surname'); }
  get title() { return this.form.get('title'); }
  get formIsInValid() { return this.form.invalid; }

  ngOnInit(): void {
    this.form.get('id')?.setValue(this.personalInformation.id);
    this.form.get('name')?.setValue(this.personalInformation.name);
    this.form.get('surname')?.setValue(this.personalInformation.surname);
    this.form.get('title')?.setValue(this.personalInformation.title);
  }

  onSave() {
    try {
      const request = new UpdateFullnameAndTitleRequest();
      request.id = this.id?.value;
      request.name = this.name?.value;
      request.surname = this.surname?.value;
      request.title = this.title?.value;

      this.personalInformationService.updateFullnameAndTitle(request).subscribe({
        next: (response) => {
          this.closeModalWithData(response);
          this.clearForm();
          this.toastrService.success(`Datos personales actualizados con éxito!`);
        },
        error: (err) => this.toastrService.error('Hubo un error al comprobar el usuario!')
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
