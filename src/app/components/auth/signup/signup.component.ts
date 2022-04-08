import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.services'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent{
   isLoading = false;

   constructor(public authService: AuthService){

   }

   onSignup(form: NgForm) {
     console.log(form.value);
    if (form.invalid) {
      return;
    }
    this.authService.createUser(form.value.email, form.value.password,
      form.value.confirmPassword, form.value.firstName,
      form.value.lastName, form.value.birthDate, form.value.phoneNumber)
   }
}
