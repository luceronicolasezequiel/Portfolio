export interface Hability {
  id: number;
  name: string;
  percentage: number;
}

export class CreateHabilityRequest {
  name: string = '';
  percentage: number = 0;
}

export class UpdateHabilityRequest {
  id: number = 0;
  name: string = '';
  percentage: number = 0;
}
export class DeleteHabilityRequest {
  id: number = 0;
}
