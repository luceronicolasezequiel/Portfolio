import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { PersonalInformation } from 'src/app/models/personal-information';
import { AuthService } from 'src/app/services/auth.service';
import { PersonalInformationService } from 'src/app/services/personal-information.service';
import { AboutMeEditComponent } from './about-me-edit/about-me-edit.component';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  @Input() title = '';

  personalInformation: PersonalInformation = { name: '', surname: '', title: '', summary: '' };
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
      this.personalInformationService.getOne().subscribe({
        next: (response) => this.personalInformation = response
      });
    } catch (error) {
      this.toastrService.error('Error!', (error as Error).message);
    }
  }

  onOpenModal() {
    const modalRef = this.modalService.open(
      AboutMeEditComponent,
      {
        scrollable: false,
        keyboard: false,
        backdrop: 'static'
      }
    );

    modalRef.componentInstance.personalInformation = this.personalInformation;

    modalRef.result.then(
      (result) => {
        console.log(result);
        if (result) {
          this.personalInformation = result;
        }
      },
      (reason) => {}
    );
  }

}
