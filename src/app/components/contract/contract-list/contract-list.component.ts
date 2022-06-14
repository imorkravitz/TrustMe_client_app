import { Component, Input, OnDestroy, OnInit, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from "../../profile/profile.service"
import { Contract } from '../contract.model';
import { ContractService } from '../contract.service';
import { AuthService } from '../../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['contract-list.component.css', 'contract_list.component.scss'],
})
export class ContractListComponent implements OnInit, OnDestroy, OnChanges {
  contracts : Contract[] = [];
  contractId : any;
  private constractsSub: Subscription | undefined;
  private status: Subscription | undefined;
  email: any;
  userId:any;
  token: string | null | undefined;
  flag: boolean = false;
  showMe: boolean[] = [];

  constructor(public contractService: ContractService,
    public authService: AuthService,
    public profileService: ProfileService,
    ) {}

  // is a place to put the code that we need to execute at very first as soon as the class is instantiated.
  ngOnInit(): void {
    this.contractService.getContractCount();
    this.contractService.getContractById();
    this.userId = this.authService.getUserId();
    this.token = this.authService.getTokenFromSessionStorage();
    this.constractsSub = this.contractService.getContractUpdatedListener().subscribe(( contracts : Contract[]): void =>{
      this.contracts = contracts;
      this.contracts.forEach((contract, index) => {
        this.showMe[index] = false;
        if(contract.sellerPay && contract.buyerPay && contract.status == "Created"){
          this.flag = true;
          console.log(contract.description);
          this.confirmContract(contract.escrowId,contract.sellerPay,contract.buyerPay, 'Active');
        }
      })
      if(this.flag){this.ngOnInit();}
      this.flag = false;
    })
    this.email = this.authService.getEmail();
  }

  ngOnChanges() {
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

  setAgreement(contractId: any, sellerAgreement: Boolean, buyerAgreement: Boolean){
    this.contractService.setAgreement(contractId, sellerAgreement, buyerAgreement);
    setTimeout(() => {
      this.ngOnInit();
    },700)
  }

  confirmContract(escrowId: any ,sellerPay:any ,buyerPay:any, status:any){
  this.contractService.updateContract(escrowId ,sellerPay ,buyerPay, status)
    console.log(status)
    setTimeout(() => {
      this.ngOnInit();
    },700)
    this.ngOnInit();
  }

  toggle(index: any) {
  this.showMe[index] = !this.showMe[index]
  }

}

@Component({
  selector: 'slide-toggle-overview',
  templateUrl: 'slide-toggle-overview.html',
})
export class SlideToggleOverview {


}
