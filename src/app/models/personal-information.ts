export interface PersonalInformation {
  id: number;
  name: string;
  surname: string;
  title: string;
  summary: string;
  profile: Array<number>;
}

export class UpdateFullnameAndTitleRequest {
  id: number = 0;
  name: string = '';
  surname: string = '';
  title: string = '';
}

export class UpdateProfileRequest {
  id: number = 0;
  profile: File = new File([], '');
}

export class UpdateSummaryRequest {
  id: number = 0;
  summary: string = '';
}
