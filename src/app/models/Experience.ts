import { Hability } from "./Hability";
import { Task } from "./Task";

export interface Experience {
  experienceId?: number;
  position: string;
  organization: string;
  period: string;
  tasks: Task[];
  habilitys: Hability[];
}
