import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { Education } from 'src/app/models/education';
import { AuthService } from 'src/app/services/auth.service';
import { EducationEditComponent } from '../education-edit/education-edit.component';

@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html',
  styleUrls: ['./education-item.component.css']
})
export class EducationItemComponent implements OnInit {

  @Input() education: Education = { id: 0, organization: '', title: '', periodFrom: '', periodTo: '' };
  @Output() updateEvent = new EventEmitter();
  
  isLoggedIn$ = of(false);
  
  constructor(
    public authService: AuthService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onOpenModal(){
    const modalRef = this.modalService.open(
      EducationEditComponent,
      {
        scrollable: false,
        keyboard: false,
        backdrop: 'static'
      }
    );

    modalRef.componentInstance.education = this.education;

    modalRef.result.then(
      (result) => {
        if (result) {
          this.education = result;
          this.updateEvent.emit();
        }
      },
      (reason) => {}
    );
  }

}
