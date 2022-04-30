import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData, AuthLogin } from '../auth/auth-data.model'
import { Subject,BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { NotifierService } from '../notifier/notifier.service';
import { AboutUsComponent } from '../about-us/about-us.component';
import { DatePipe } from '@angular/common'


@Injectable({providedIn: 'root'})

export class AuthService {
private isAuthenticated:any = false;
// private token? :string;
private accessToken:any;
private email:any;
private authStatusListener = new BehaviorSubject<boolean>(false);

constructor(private http: HttpClient, private router: Router,
  private notificationService: NotifierService,
  ) {}

getEmail(){
  return this.email;
}

getToken() {
  return this.getTokenFromSessionStorage();
}

getIsAuth():boolean {
  return  this.getToken()!==null? true:false;
  //this.isAuthenticated;
}

getAuthStatusListener() {
  this.authStatusListener.next(this.getIsAuth());
  return this.authStatusListener.asObservable();
}

createUser(email: string, password: string, confirmPassword: string, firstName: string,
   lastName: string,birthday: Date, phoneNumber: string){

    // birthday=new Date();
    // let latest_date =this.datepipe.transform(birthday, 'yyyy-MM-dd');

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

  removeTokenInSessionStorage(){
      sessionStorage.removeItem("token");
  }
  setTokenInSessionStorage(token: string){
    sessionStorage.setItem("token",token);
  }
  getTokenFromSessionStorage(){
    return sessionStorage.getItem("token");
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
      this.setTokenInSessionStorage(accessToken);
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
    this.removeTokenInSessionStorage();
    this.authStatusListener.next(false); // push this info to the other component

  }

  getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  removeCookie(cname: string) {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

}
