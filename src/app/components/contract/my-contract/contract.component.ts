import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContractService } from '../contract.service';
import { Router } from '@angular/router';
import { NotifierService } from '../../notifier/notifier.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent{
  minDate = new Date();
  contractId: string | null | undefined;

  constructor(public contractService: ContractService,
    private notificationService: NotifierService,
    private router: Router) {}

  onAddContract(form : NgForm){
     if(form.invalid){
       return;
     }
     this.contractService.addContract(form.value.description,
      form.value.deposit ,form.value.email ,form.value.date);
      this.notificationService.showNotification('Contract sent successfully', 'OK', 'success');
      this.router.navigate(['/homepage']);
  }
}
