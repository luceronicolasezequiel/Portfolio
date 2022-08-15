export interface Experience {
  id: number;
  position: string;
  organization: string;
  periodFrom: string;
  periodTo: string;
}

export class CreateExperienceRequest {
  position: string = '';
  organization: string = '';
  periodFrom: string = '';
  periodTo: string = '';
}

export class UpdateExperienceRequest {
  id: number = 0;
  position: string = '';
  organization: string = '';
  periodFrom: string = '';
  periodTo: string = '';
}
