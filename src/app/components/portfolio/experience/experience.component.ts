import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Experience } from 'src/app/models/experience';
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
    private experienceService: ExperienceService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getExperiences();
  }

  getExperiences() {
    try {
      this.experienceService.getAll().subscribe({
        next: (response) => this.experiences = response
      });
    } catch (error) {
      this.toastrService.error('Error!', (error as Error).message);
    }
  }

}
