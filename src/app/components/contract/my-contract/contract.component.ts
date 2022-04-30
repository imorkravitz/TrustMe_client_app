import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent{
  minDate = new Date();
  contractId: string | null | undefined;

  constructor(public contractService: ContractService) {}

  onAddContract(form : NgForm){
     if(form.invalid){
       return;
     }

     this.contractService.addContract(form.value.description,
      form.value.deposit ,form.value.email ,form.value.date);

  }
}
