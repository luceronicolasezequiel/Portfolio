import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { Education } from 'src/app/models/education';
import { AuthService } from 'src/app/services/auth.service';
import { EducationService } from 'src/app/services/education.service';
import { EducationAddComponent } from './education-add/education-add.component';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  @Input() title = '';

  educations: Education[] = [];
  isLoggedIn$ = of(false);

  constructor(
    public authService: AuthService,
    private educationService: EducationService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
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

  onOpenModal() {
    const modalRef = this.modalService.open(
      EducationAddComponent,
      {
        scrollable: false,
        keyboard: false,
        backdrop: 'static'
      }
    );

    modalRef.result.then(
      (result) => {
        if (result) {
          this.getEducations();
        }
      },
      (reason) => {}
    );
  }

}
