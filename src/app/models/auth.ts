export interface LoginResponse {
  username: string;
  accessToken: string;
}

export class LoginRequest {
  username: string = '';
  password: string = '';
}
