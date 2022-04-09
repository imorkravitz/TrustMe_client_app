import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.services'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  isLoading = false;
  errAlert: boolean = false;

   constructor(public authService: AuthService){}

   onLogin(form: NgForm) {
     console.log(form.value);
    if (form.invalid) {
      this.errAlert=true;
      return;
    }
    this.authService.login(form.value.email, form.value.password)
   }
   closeAlert(){
    this.errAlert=false;
  }
}
