import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { Experience } from 'src/app/models/experience';
import { AuthService } from 'src/app/services/auth.service';
import { ExperienceEditComponent } from '../experience-edit/experience-edit.component';

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
  styleUrls: ['./experience-item.component.css']
})
export class ExperienceItemComponent implements OnInit {

  @Input() experience: Experience = { position: '', organization: '', periodFrom: '', periodTo: '', tasks: [{ name: '' }] };

  isLoggedIn$ = of(false);

  constructor(
    public authService: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onOpenModal(){
    const modalRef = this.modalService.open(
      ExperienceEditComponent,
      {
        scrollable: false,
        keyboard: false,
        backdrop: 'static'
      }
    );

    modalRef.componentInstance.experience = this.experience;

    modalRef.result.then(
      (result) => {
        console.log(result);
        if (result) {
          this.experience = result;
        }
      },
      (reason) => {}
    );
  }

}
