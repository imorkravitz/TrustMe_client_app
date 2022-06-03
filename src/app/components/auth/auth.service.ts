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
private accessToken:any;
private email:any;
private tokenTimer: any;
private userId: any;
private authStatusListener = new BehaviorSubject<boolean>(false);

constructor(private http: HttpClient,
  private router: Router,
  private notificationService: NotifierService,
  ) {
    this.userId = "";
    this.email= "";
  }

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

getUserId(){
  return this.userId;
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
    this.http.post<{accessToken: string, expiresIn: number, userId: String, email: String}>("http://localhost:3000/api/users/login", authLogin).
    subscribe(response =>{
      console.log(response);
      const accessToken = response.accessToken;
      this.accessToken = accessToken;
      this.setTokenInSessionStorage(accessToken);
        if (accessToken!=null) {
          this.notificationService.showNotification('User logged in successfully', 'OK', 'success');
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration)
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.email = response.email;
          this.authStatusListener.next(true);
          const now = new Date(); // from the current moment + durationTime of expiresInDuration = 60m
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(accessToken, expirationDate, this.userId, this.email)
          this.router.navigate(['/homepage']);
      }
    }, err =>{
        this.notificationService.showNotification('User do not exist! please try again.', 'OK', 'error');
    })
  }

  logout(){
    this.accessToken = null;
    this.isAuthenticated = false;
    this.userId = null;
    this.email =null;
    this.removeTokenInSessionStorage();
    this.authStatusListener.next(false); // push this info to the other component
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/homepage']);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) { // if the date is in the future == the durationTime not ended!
      this.accessToken = authInformation.accessToken;
      this.isAuthenticated = true
      this.userId = authInformation.userId;
      this.email = authInformation.email;
      this.setAuthTimer(expiresIn / 1000)
      this.authStatusListener.next(true)
    }
  }

  // set timer for authorization
  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000); // == 15m
  }
  // save the token in localStorage
  private saveAuthData(accessToken: string, expirationDate: Date, userId: string, email:string) {
    localStorage.setItem("accessToken", accessToken); // store the value of the token
    localStorage.setItem("expiration", expirationDate.toISOString()); // with the expiration date
    localStorage.setItem("userId", userId)
    localStorage.setItem("email", email)
  }

  // remove the token from localStorage
  private clearAuthData() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("email")
  }

  public getAuthData() {
    const accessToken = localStorage.getItem("accessToken");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    if (!accessToken || !expirationDate) {
      return;
    }
    return {
      accessToken: accessToken,
      expirationDate: new Date(expirationDate),
      userId: userId,
      email: email,
    }
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
