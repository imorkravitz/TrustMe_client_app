import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service'
import { NotifierService } from '../../notifier/notifier.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  isLoading = false;
  errAlert: boolean = false;

   constructor(public authService: AuthService,
    private notificationService: NotifierService){}

   onLogin(form: NgForm) {
     console.log(form.value);
    if (form.invalid) {
      this.notificationService.showNotification('Wrong input', 'OK', 'error');
      return;
    }
    this.authService.login(form.value.email, form.value.password)
    
    this.notificationService.showNotification('User logged in successfully', 'OK', 'success');

   }
   closeAlert(){
    this.errAlert=false;
  }
}
