export interface Proyect {
  id: number;
  name: string;
  dateRealization: string;
  description: string;
  urls: string;
}

export class CreateProyectRequest {
  name: string = '';
  dateRealization: string = '';
  description: string = '';
  urls?: string;
}

export class UpdateProyectRequest {
  id: number = 0;
  name: string = '';
  dateRealization: string = '';
  description: string = '';
  urls?: string;
}

export class DeleteProyectRequest {
  id: number = 0;
}
