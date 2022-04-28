import { Component, OnInit } from '@angular/core';
import {mimeType} from "./mime-type.validator";

import { UserDetails } from '../profile.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {

  constructor() { }

  user : UserDetails = {name: 'itai levy', phone: '0546751009',  email: 'itaibiskall@gmail.com', image: undefined};
  imagePreview : string | null | ArrayBuffer = "";
  form !: FormGroup ;

  ngOnInit(): void {
   this.form = new FormGroup({
    image: new FormControl(null,{
      validators:[Validators.required],
      asyncValidators: [mimeType]
   })
   });
  }

  onf(){
    return true;
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files![0];
    this.form?.patchValue({image: file});
    this.form.get('image')?.updateValueAndValidity();
    this.user.image = file;
    console.log(file);
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(file);
  }
}


