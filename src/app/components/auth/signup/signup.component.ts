import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service'
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';

@Component({
selector: 'app-signup',
templateUrl: './signup.component.html',
styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
isLoading = false;
alert: boolean = false;
errAlert: boolean = false;
errAlert2: boolean = false;



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

constructor(public authService: AuthService){

}

onSignup(form: NgForm) {
  console.log(form.value);

  if (form.invalid) {
    this.errAlert=true;
    return;
  }

  if (form.value.password==form.value.confirmPassword) {
    this.authService.createUser(form.value.email, form.value.password, form.value.confirmPassword,
      form.value.firstName, form.value.lastName, form.value.birthDate, form.value.phoneNumber)
      this.alert=true;
  }else{
    console.log(form.value.confirmPassword)
    this.errAlert2=true;
    return;
  }


}

checkPasswords(group: FormGroup) { // here we have the 'passwords' group

  const password = group.get('passFormControl');
  const confirmPassword = group.get('confirmFormControl');

  return password === confirmPassword ? null : { notSame: true }
}

closeAlert(){
  this.alert=false;
  this.errAlert=false;
}

ngOnInit(){}

}
