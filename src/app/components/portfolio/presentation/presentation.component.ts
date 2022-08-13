import { Component, Input, OnInit } from '@angular/core';
import { right } from '@popperjs/core';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { PersonalInformation } from 'src/app/models/personal-information';
import { AuthService } from 'src/app/services/auth.service';
import { PersonalInformationService } from 'src/app/services/personal-information.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {

  personalInformation: PersonalInformation = { name: '', surname: '', title: '', summary: '' };
  isLoggedIn$ = of(false);

  constructor(
    public authService: AuthService,
    private personalInformationService: PersonalInformationService,
    private toastrService: ToastrService
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

}
