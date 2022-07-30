import { Hability } from "./Hability";
import { Task } from "./Task";

export interface Experience {
  id?: number;
  position: string;
  organization: string;
  periodFrom: string;
  periodTo: string;
  tasks: Task[];
  habilities: Hability[];
}
