import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service'
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { NotifierService } from '../../notifier/notifier.service';
import { Router } from '@angular/router';

@Component({
selector: 'app-signup',
templateUrl: './signup.component.html',
styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
isLoading = false;

passFormControl = new FormControl('', [
Validators.required,
]);
confirmFormControl = new FormControl('', [
Validators.required,
]);
compareFormControl = new FormControl('', [
Validators.required,
]);

hide = true;

constructor(public authService: AuthService,
  private notificationService: NotifierService,
  private router: Router){

}
onSignup(form: NgForm) {
  console.log(form.value);
  console.log(form.value.birthday);
  if (form.invalid) {
    this.notificationService.showNotification('All fields are required!', 'OK', 'error');
    return;
  }

  if (form.value.password==form.value.confirmPassword) {
    this.authService.createUser(form.value.email, form.value.password, form.value.confirmPassword,
    form.value.firstName, form.value.lastName, form.value.birthday, form.value.phoneNumber)
    this.notificationService.showNotification('User created successfully!', 'OK', 'success');
    setTimeout(() =>{
      this.router.navigate(['homepage']);
    },1000);
  }else{
    console.log(form.value.confirmPassword)
    this.notificationService.showNotification('Password as to be matched!', 'OK', 'error');
    return;
  }
}


checkPasswords(group: FormGroup) { // here we have the 'passwords' group

  const password = group.get('passFormControl');
  const confirmPassword = group.get('confirmFormControl');

  return password === confirmPassword ? null : { notSame: true }
}

ngOnInit(){}

}
