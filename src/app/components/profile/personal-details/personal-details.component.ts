import { Component, HostListener, OnInit } from '@angular/core';
// import {mimeType} from "./mime-type.validator";

import { UserDetails } from '../profile.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {


  constructor() { }
  mobile: any;
  user : UserDetails = {name: 'itai levy', phone: '0546751009',  email: 'itaibiskall@gmail.com', image: undefined};
  imagePreview : string | null | ArrayBuffer = "";
  form !: FormGroup ;

  @HostListener("window:resize", ['$event'])
  private onResize(event: { target: { innerWidth: any; }; }): any {
    this.mobile = event.target.innerWidth;
  }

  ngOnInit() {
   this.form = new FormGroup({
    title: new FormControl(null,{validators:[Validators.required]}),
  //   image: new FormControl(null,{
  //     // asyncValidators: [mimeType]
  //  })
   });
   this.form.patchValue({title: this.user.name});
   this.form.get('title')?.updateValueAndValidity();
   this.mobile = window.innerWidth;
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


