import { Component, Input, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/Experience';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  @Input() title = '';
  experiences: Experience[] = [];

  constructor(
    private experienceService: ExperienceService
  ) { }

  ngOnInit(): void {
    this.getExperiences();
  }

  getExperiences() {
    this.experienceService.getExperiences()
      .subscribe(experiences => {
        this.experiences = experiences;
      });
  }

}
