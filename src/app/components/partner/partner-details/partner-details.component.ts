import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

import { UserDetails } from '../partner.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PartnerService } from '../partner.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-partner-details',
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.css']
})
export class PartnerDetailsComponent implements OnInit, OnDestroy{


  constructor(public partnerService: PartnerService,
    public authService: AuthService) { }

  userId: any;
  mobile: any;
  user !: UserDetails;
  private constractsSub: Subscription | undefined;

  imagePreview : string | null | ArrayBuffer = "";
  form !: FormGroup ;

  @HostListener("window:resize", ['$event'])
  private onResize(event: { target: { innerWidth: any; }; }): any {
    this.mobile = event.target.innerWidth;
  }

  ngOnInit() {
  this.userId = this.authService.getUserId();
  this.partnerService.getUserDetailsByUserId(this.userId);
  this.constractsSub = this.partnerService.getDetailsListener().subscribe(( user : UserDetails): void =>{
    this.user = user;
    this.form.patchValue({title: this.user.nameToPatch});
    this.form.get('title')?.updateValueAndValidity();
  })
   this.form = new FormGroup({
    title: new FormControl(null,{validators:[Validators.required]}),
  //   image: new FormControl(null,{
  //     // asyncValidators: [mimeType]
  //  })
   });
  //  this.form.patchValue({title: this.user.name});
  //  this.form.get('title')?.updateValueAndValidity();
   this.mobile = window.innerWidth;
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files![0];
    this.form?.patchValue({image: file});
    this.form.get('image')?.updateValueAndValidity();
    this.user.image = file;
    // console.log(file);
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(file);
  }

  ngOnDestroy(): void {
    this.constractsSub?.unsubscribe();
  }
}
