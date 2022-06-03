import { Component, Input, OnDestroy, OnInit, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from "../../profile/profile.service"
import { Contract } from '../contract.model';
import { ContractService } from '../contract.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['contract-list.component.css'],
})
export class ContractListComponent implements OnInit, OnDestroy, OnChanges {
  contracts : Contract[] = [];
  contractId : any;
  private constractsSub: Subscription | undefined;
  private status: Subscription | undefined;
  email: any;

  constructor(public contractService: ContractService,
    public authService: AuthService,
    public profileService: ProfileService,
    ) {
    }

  // is a place to put the code that we need to execute at very first as soon as the class is instantiated.
  ngOnInit(): void {
    this.contractService.getContractCount();
    this.contractService.getContractById();
    this.constractsSub = this.contractService.getContractUpdatedListener().subscribe(( contracts : Contract[]): void =>{
      this.contracts = contracts;
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

  confirmContract(contractId: any){
  this.contractService.updateContract(contractId)
  }

  buyerPayed(contractId: any){
    this.contractService.updateBuyerPay(contractId);

  }
  sellerPayed(contractId: any){
    this.contractService.updateSellerPay(contractId)
  }

//   refresh(): void {
//     window.location.reload();
// }
}
