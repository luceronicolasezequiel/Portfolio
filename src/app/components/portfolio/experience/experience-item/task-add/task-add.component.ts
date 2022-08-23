import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Experience } from 'src/app/models/experience';
import { CreateTaskRequest, Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  @Input() experience!: Experience;
  
  form: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private toastrService: ToastrService
  ) {

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(300)]],
      experienceId: ['', [Validators.required]]
    });

  }

  get name() { return this.form.get('name'); }
  get experienceId() { return this.form.get('experienceId'); }
  get formIsInValid() { return this.form.invalid; }

  ngOnInit(): void {
    this.form.get('experienceId')?.setValue(this.experience.id);
  }

  onSave() {
    try {
      const request = new CreateTaskRequest();
      request.name = this.name?.value;
      request.experienceId = this.experienceId?.value;

      this.taskService.create(request).subscribe({
        next: (response) => {
          this.closeModalWithData(response);
          this.clearForm();
          this.toastrService.success('Tarea registrada con éxito!');
        },
        error: (err) => this.toastrService.error('Hubo un error al registrar la tarea!')
      });
    } catch (error) {
      this.toastrService.error('Error!', (error as Error).message);
    }
  }

  onCancel() {
    this.closeModal();
    this.clearForm();
  }

  clearForm() {
    this.form.reset();
  }

  closeModal() {
    this.activeModal.close();
  }

  closeModalWithData(task: Task) {
    this.activeModal.close(task);
  }

}
