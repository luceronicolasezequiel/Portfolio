export interface Task {
  id: number;
  name: string;
  experienceId: number;
}

export class CreateTaskRequest {
  name: string = '';
  experienceId: number = 0;
}

export class UpdateTaskRequest {
  id: number = 0;
  name: string = '';
  experienceId: number = 0;
}

export class DeleteTaskRequest {
  id: number = 0;
}
