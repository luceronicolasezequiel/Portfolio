import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PersonalInformation, UpdateProfileRequest } from 'src/app/models/personal-information';
import { PersonalInformationService } from 'src/app/services/personal-information.service';

@Component({
  selector: 'app-about-me-edit-profile',
  templateUrl: './about-me-edit-profile.component.html',
  styleUrls: ['./about-me-edit-profile.component.css']
})
export class AboutMeEditProfileComponent implements OnInit {

  @Input() personalInformation!: PersonalInformation;
  
  form: FormGroup;
  loading: boolean = false;
  
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private personalInformationService: PersonalInformationService,
    private toastrService: ToastrService
  ) {
    
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      profile: ['', [Validators.required]]
    });

  }

  get id() { return this.form.get('id'); }
  get profile() { return this.form.get('profile'); }
  get formIsInValid() { return this.form.invalid; }

  ngOnInit(): void {
    this.form.get('id')?.setValue(this.personalInformation.id);
  }

  onChangeProfile($event: Event) {
    const file = ($event.target as HTMLInputElement).files![0];
    this.form.get('profile')?.setValue(file);
  }

  onSave() {
    try {
      this.loading = true;

      const request = new UpdateProfileRequest();
      request.id = this.id?.value;
      request.profile = this.profile?.value;

      this.personalInformationService.updateProfile(request).subscribe({
        next: (response) => {
          this.closeModalWithData(response);
          this.clearForm();
          this.toastrService.success('Imagen de Perfil actualizado con éxito!');
          this.loading = false;
        },
        error: (err) => {
          this.toastrService.error('Hubo un error al actualizar la imagen de perfil!');
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

  closeModalWithData(personalInformation: PersonalInformation) {
    this.activeModal.close(personalInformation);
  }

}
