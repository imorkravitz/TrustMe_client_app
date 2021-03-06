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

   constructor(public authService: AuthService,
    private notificationService: NotifierService,
    public loaderService: LoaderService,
    private router: Router){}

   onLogin(form: NgForm) {
    if (form.invalid) {
      this.notificationService.showNotification('Wrong input', 'OK', 'error');
      return;
    }
    this.authService.login(form.value.email, form.value.password)
    this.router.navigate(['/homepage']);
   }
}
