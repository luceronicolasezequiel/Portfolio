import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  @Input() title = '';
  educations: Education[] = [];

  constructor(
    private educationService: EducationService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getEducations();
  }

  getEducations() {
    try {
      this.educationService.getAll().subscribe({
        next: (response) => this.educations = response
      });
    } catch (error) {
      this.toastrService.error('Error!', (error as Error).message);
    }
  }

}
