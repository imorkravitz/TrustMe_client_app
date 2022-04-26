import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData, AuthLogin } from '../auth/auth-data.model'
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NotifierService } from '../notifier/notifier.service';

@Injectable({providedIn: 'root'})

export class AuthService {
private isAuthenticated = false;
// private token? :string;
private accessToken:any;
private email:any;
private authStatusListener = new Subject<boolean>();

constructor(private http: HttpClient, private router: Router,
  private notificationService: NotifierService,
  ) {}

getEmail(){
  return this.email;
}

getToken() {
  return this.accessToken;
}

getIsAuth() {
  return this.isAuthenticated;
}

getAuthStatusListener() {
  return this.authStatusListener.asObservable();
}

createUser(email: string, password: string, confirmPassword: string, firstName: string,
   lastName: string,birthday: Date, phoneNumber: string){

    const authData : AuthData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
      phoneNumber: phoneNumber,
      created: new Date()
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
    this.http.post<{accessToken: string}>("http://localhost:3000/api/users/login", authLogin).
    subscribe(response =>{
      console.log(response);
      const accessToken = response.accessToken;
      this.accessToken = accessToken;
        if (accessToken!=null) {
          this.notificationService.showNotification('User logged in successfully', 'OK', 'success');
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
      }
    }, err =>{
        this.notificationService.showNotification('User do not exist! please try again.', 'OK', 'error');
    })
  }

  logout(){
    this.accessToken = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false); // push this info to the other component
  }
}
