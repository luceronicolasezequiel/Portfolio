import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Task, UpdateTaskRequest } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  @Input() task!: Task;

  form: FormGroup;
  
  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private toastrService: ToastrService
  ) {
    
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      experienceId: ['', [Validators.required]]
    });

  }

  get id() { return this.form.get('id'); }
  get name() { return this.form.get('name'); }
  get experienceId() { return this.form.get('experienceId'); }
  get formIsInValid() { return this.form.invalid; }

  ngOnInit(): void {
    this.form.get('id')?.setValue(this.task.id);
    this.form.get('name')?.setValue(this.task.name);
    this.form.get('experienceId')?.setValue(this.task.experienceId);
  }

  onSave() {
    try {
      const request = new UpdateTaskRequest();
      request.id = this.id?.value;
      request.name = this.name?.value;
      request.experienceId = this.experienceId?.value;

      this.taskService.update(request).subscribe({
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
