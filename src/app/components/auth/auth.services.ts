import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData, AuthLogin } from '../auth/auth-data.model'
@Injectable({providedIn: 'root'})

export class AuthService {
constructor(private http: HttpClient){

}

createUser(email: string, password: string, confirmPassword: string
    ,firstName: string, lastName: string, birthDate: string, phoneNumber: string){

    const authData : AuthData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
      phoneNumber: phoneNumber
    }
    this.http.
    post("http://localhost:3000/api/users/signup",authData).
    subscribe(response =>{
      console.log(response);
    })
  }


  login(email: string, password: string) {
    const authLogin : AuthLogin = {
      email: email,
      password: password
    }
    this.http.post("http://localhost:3000/api/users/login", authLogin).
    subscribe(response =>{
      console.log(response);

    })
  }
}
