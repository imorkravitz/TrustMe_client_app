import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PartnerService } from '../partner.service';

@Component({
  selector: 'app-create-recomendation',
  templateUrl: './create-recomendation.component.html',
  styleUrls: ['./create-recomendation.component.css']
})
export class CreateRecomendationComponent implements OnInit {

  constructor(partnerService : PartnerService) { }

  ngOnInit(): void {
  }

  onAddPost(form: NgForm){
    // if(form.invalid){
    //   return;
    // }

    // if(this.mode == 'create'){
    //   this.partnerService.addPost(form.value.title,form.value.content);
    // }else{
    //   const tempId = this.postId;
    //   if(tempId != null){
    //      this.partnerService.updatePost(tempId, form.value.title,form.value.content);
    //   }
    }

}
