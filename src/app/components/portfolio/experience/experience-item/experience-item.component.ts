import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { Experience } from 'src/app/models/experience';
import { DeleteTaskRequest, Task } from 'src/app/models/task';
import { AuthService } from 'src/app/services/auth.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { TaskService } from 'src/app/services/task.service';
import { ExperienceEditComponent } from '../experience-edit/experience-edit.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskEditComponent } from './task-edit/task-edit.component';

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
  styleUrls: ['./experience-item.component.css']
})
export class ExperienceItemComponent implements OnInit {

  @Input() experience: Experience = { id: 0, position: '', organization: '', periodFrom: '', periodTo: '' };
  @Output() updateEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  tasks: Task[] = [];
  isLoggedIn$ = of(false);

  constructor(
    public authService: AuthService,
    private experienceService: ExperienceService,
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

  onDelete() {
    try {
      this.experienceService.delete(this.experience.id).subscribe({
        next: () => {
          this.deleteEvent.emit();
          this.toastrService.success('Experiencia eliminada con éxito!');
        },
        error: (err) => this.toastrService.error('Hubo un error al eliminar la experiencia!')
      });
    } catch (error) {
      this.toastrService.error('Error!', (error as Error).message);
    }
  }

  onOpenModalTaskAdd() {
    const modalRef = this.modalService.open(
      TaskAddComponent,
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
          this.getTasks();
        }
      },
      (reason) => {}
    );
  }

  onOpenModalTaskEdit(task: Task) {
    const modalRef = this.modalService.open(
      TaskEditComponent,
      {
        scrollable: false,
        keyboard: false,
        backdrop: 'static'
      }
    );

    modalRef.componentInstance.task = task;

    modalRef.result.then(
      (result) => {
        if (result) {
          this.getTasks();
        }
      },
      (reason) => {}
    );
  }

  onTaskDelete(task: Task) {
    try {
      const request = new DeleteTaskRequest();
      request.id = task.id;

      this.taskService.delete(request).subscribe({
        next: () => {
          this.deleteEvent.emit();
          this.toastrService.success('Tarea eliminada con éxito!');
        },
        error: (err) => this.toastrService.error('Hubo un error al eliminar la tarea!')
      });
    } catch (error) {
      this.toastrService.error('Error!', (error as Error).message);
    }
  }

}
