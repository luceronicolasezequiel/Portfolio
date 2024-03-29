import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { PersonalInformation } from 'src/app/models/personal-information';
import { AuthService } from 'src/app/services/auth.service';
import { PersonalInformationService } from 'src/app/services/personal-information.service';
import { PresentationEditComponent } from './presentation-edit/presentation-edit.component';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {

  personalInformation: PersonalInformation = { id: 0, name: '', surname: '', title: '', summary: '', profile: [] };
  loading: boolean = false;
  isLoggedIn$ = of(false);

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
          this.loading = false;
        }
      });
    } catch (error) {
      this.toastrService.error('Error!', (error as Error).message);
    }
  }

  onOpenModal() {
    const modalRef = this.modalService.open(
      PresentationEditComponent,
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

}
