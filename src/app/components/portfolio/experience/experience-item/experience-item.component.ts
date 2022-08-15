import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { Experience } from 'src/app/models/experience';
import { Task } from 'src/app/models/task';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { ExperienceEditComponent } from '../experience-edit/experience-edit.component';

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
  styleUrls: ['./experience-item.component.css']
})
export class ExperienceItemComponent implements OnInit {

  @Input() experience: Experience = { id: 0, position: '', organization: '', periodFrom: '', periodTo: '' };
  @Output() updateEvent = new EventEmitter();

  tasks: Task[] = [];
  isLoggedIn$ = of(false);

  constructor(
    public authService: AuthService,
    private taskService: TaskService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.getTasks();
  }

  getTasks() {
    try {
      this.taskService.getByExperience(this.experience.id).subscribe({
        next: (response) => this.tasks = response
      });
    } catch (error) {
      this.toastrService.error('Error!', (error as Error).message);
    }
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
        if (result) {
          this.experience = result;
          this.updateEvent.emit();
        }
      },
      (reason) => {}
    );
  }

}
