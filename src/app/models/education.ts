export interface Education {
  id: number;
  organization: string;
  title: string;
  periodFrom: string;
  periodTo: string;
}

export class CreateEducationRequest {
  organization: string = '';
  title: string = '';
  periodFrom: string = '';
  periodTo: string = '';
}

export class UpdateEducationRequest {
  id: number = 0;
  organization: string = '';
  title: string = '';
  periodFrom: string = '';
  periodTo: string = '';
}

export class DeleteEducationRequest {
  id: number = 0;
}
