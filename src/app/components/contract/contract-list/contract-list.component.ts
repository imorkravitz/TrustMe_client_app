import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Contract } from '../contract.model';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['contract-list.component.css'],
})
export class ContractListComponent implements OnInit, OnDestroy {
  contracts : Contract[] = [];
  private constractsSub: Subscription | undefined;

  constructor(public contractService: ContractService) {}

  // is a place to put the code that we need to execute at very first as soon as the class is instantiated.
  ngOnInit(): void {
    // this.contractService.getAllContract();
    this.contractService.getContractById();
    this.constractsSub = this.contractService.getContractUpdatedListener().subscribe(( contracts : Contract[]): void =>{
      this.contracts = contracts;
    })
  }

  correctDate(contract : Contract){
    const tempDate = contract.date.getFullYear();
    return tempDate.toFixed();
  }

  ngOnDestroy(): void {
     this.constractsSub?.unsubscribe();
  }

  onDelete(postId: String | undefined): void {
    // console.log("onDelete")
    // if(postId != null) {
    //   this.postService.deletePost(postId);
    // }
  }

}
