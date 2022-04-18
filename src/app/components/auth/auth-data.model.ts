export interface AuthData{
  email: string;
  password : string;
  confirmPassword : string;
  firstName : string;
  lastName : string;
  birthday : Date;
  phoneNumber : string;
  created : Date;
}

export interface AuthLogin{
  email: string;
  password: string;
}
