import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PersonalInformation } from 'src/app/models/personal-information';

declare var window: any;

@Component({
  selector: 'app-presentation-edit',
  templateUrl: './presentation-edit.component.html',
  styleUrls: ['./presentation-edit.component.css']
})
export class PresentationEditComponent implements OnInit {

  @Input() personalInformation: PersonalInformation = { name: '', surname: '', title: '', summary: '' };

  modal: any;
  form: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private toastrService: ToastrService
  ) {

    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });

  }

  get id() { return this.form.get('id'); }
  get name() { return this.form.get('name'); }
  get surname() { return this.form.get('surname'); }
  get formIsInValid() { return this.form.invalid; }

  ngOnInit(): void {
    this.modal = new window.bootstrap.Modal(
      document.getElementById("modalPresentationEdit")
    );

    this.form.controls['name'].setValue(this.personalInformation.name);
  }

  onSave() {

  }

  onCancel() {
    this.clearForm();
  }

  clearForm() {
    this.form.reset();
  }

  closeModal() {
    this.modal.hide();
  }

}
