import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { PersonalInformation } from 'src/app/models/personal-information';
import { AuthService } from 'src/app/services/auth.service';
import { PersonalInformationService } from 'src/app/services/personal-information.service';
import { AboutMeEditGeneralComponent } from './about-me-edit-general/about-me-edit-general.component';
import { AboutMeEditProfileComponent } from './about-me-edit-profile/about-me-edit-profile.component';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  @Input() title = '';

  personalInformation: PersonalInformation = { id: 0, name: '', surname: '', title: '', summary: '', profile: [] };
  loading: boolean = false;
  isLoggedIn$ = of(false);
  profile: string = '';
  
  constructor(
    public authService: AuthService,
    private personalInformationService: PersonalInformationService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.getPersonalInformation();
  }

  getPersonalInformation() {
    try {
      this.loading = true;

      this.personalInformationService.getOne().subscribe({
        next: (response) => {
          this.personalInformation = response;
          this.setProfile(this.personalInformation);
          this.loading = false;
        }
      });
    } catch (error) {
      this.toastrService.error('Error!', (error as Error).message);
    }
  }

  onOpenModalProfile() {
    const modalRef = this.modalService.open(
      AboutMeEditProfileComponent,
      {
        scrollable: false,
        keyboard: false,
        backdrop: 'static'
      }
    );

    modalRef.componentInstance.personalInformation = this.personalInformation;

    modalRef.result.then(
      (result) => {
        if (result) {
          this.personalInformation = result;
          this.setProfile(this.personalInformation);
        }
      },
      (reason) => {}
    );
  }

  onOpenModalGeneral() {
    const modalRef = this.modalService.open(
      AboutMeEditGeneralComponent,
      {
        scrollable: false,
        keyboard: false,
        backdrop: 'static'
      }
    );

    modalRef.componentInstance.personalInformation = this.personalInformation;

    modalRef.result.then(
      (result) => {
        if (result) {
          this.personalInformation = result;
        }
      },
      (reason) => {}
    );
  }

  setProfile(personalInformation: PersonalInformation) {
    this.profile = 'data:image/png;base64,' + personalInformation.profile;
  }

}
