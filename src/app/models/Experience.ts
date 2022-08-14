import { Hability } from "./hability";
import { Task } from "./task";

export interface Experience {
  id?: number;
  position: string;
  organization: string;
  periodFrom: string;
  periodTo: string;
  tasks: Task[];
}

export class CreateExperienceRequest {
  position: string = '';
  organization: string = '';
  periodFrom: string = '';
  periodTo: string = '';
}
