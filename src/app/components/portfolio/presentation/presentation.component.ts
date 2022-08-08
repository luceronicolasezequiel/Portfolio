import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PersonalInformation } from 'src/app/models/personal-information';
import { PersonalInformationService } from 'src/app/services/personal-information.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {

  personalInformation: PersonalInformation = { name: '', surname: '', title: '', summary: '' };

  constructor(
    private personalInformationService: PersonalInformationService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
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
