export interface Education {
  id?: number;
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
