import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { Experience } from 'src/app/models/experience';
import { AuthService } from 'src/app/services/auth.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { ExperienceAddComponent } from './experience-add/experience-add.component';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  @Input() title = '';

  experiences: Experience[] = [];
  isLoggedIn$ = of(false);
  
  constructor(
    public authService: AuthService,
    private experienceService: ExperienceService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
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

  onOpenModal() {
    const modalRef = this.modalService.open(
      ExperienceAddComponent,
      {
        scrollable: false,
        keyboard: false,
        backdrop: 'static'
      }
    );

    modalRef.result.then(
      (result) => {
        console.log(result);
        if (result) {
          this.getExperiences();
        }
      },
      (reason) => {}
    );
  }

}
