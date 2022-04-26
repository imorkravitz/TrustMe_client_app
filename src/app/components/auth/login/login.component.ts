import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service'
import { NotifierService } from '../../notifier/notifier.service';
import { LoaderService } from '../../loader/loader.service'
import { AuthLogin } from '../auth-data.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  isLoading = false;
  errAlert: boolean = false;

   constructor(public authService: AuthService,
    private notificationService: NotifierService,
    public loaderService: LoaderService,
    private router: Router){}

   onLogin(form: NgForm) {
     console.log(form.value);
    if (form.invalid) {
      this.notificationService.showNotification('Wrong input', 'OK', 'error');
      return;
    }
    this.authService.login(form.value.email, form.value.password)
    setTimeout(() =>{
      this.router.navigate(['homepage']);
    },2000);
   }
   closeAlert(){
    this.errAlert=false;
  }
}
