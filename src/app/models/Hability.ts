export interface Hability {
  id?: number;
  name: string;
  percentage: number;
}

export class CreateHabilityRequest {
  name: string = '';
  percentage: number = 0;
}
