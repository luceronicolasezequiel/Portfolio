import { Component, OnInit } from '@angular/core';
import { PersonalInformation } from 'src/app/models/personal-information';
import { PersonalInformationService } from 'src/app/services/personal-information.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  personalInformation: PersonalInformation = { fullName: '', title: '', summary: '' };

  constructor(
    private personalInformationService: PersonalInformationService
  ) { }

  ngOnInit(): void {
    this.getPersonalInformation();
  }

  getPersonalInformation() {
    this.personalInformationService.getOne()
      .subscribe(personalInformation => {
        this.personalInformation = personalInformation;
      });
  }

}
