export interface AuthData{
  email: string;
  password : string;
  confirmPassword : string;
  firstName : string;
  lastName : string;
  birthDate : Date;
  phoneNumber : string;
}

export interface AuthLogin{
  email: string;
  password: string;
}