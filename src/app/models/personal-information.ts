export interface PersonalInformation {
  id?: number;
  name: string;
  surname: string;
  title: string;
  summary: string;
}

export class UpdateFullnameAndTitleRequest {
  id: number = 0;
  name: string = '';
  surname: string = '';
  title: string = '';
}

export class UpdateSummaryRequest {
  id: number = 0;
  summary: string = '';
}
