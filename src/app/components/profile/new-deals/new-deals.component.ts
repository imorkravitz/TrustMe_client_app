import { Component, OnDestroy, OnInit, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { NewContract, UserDetails } from '../profile.model';
import { ProfileService } from '../profile.service';
import { ContractService } from '../../contract/contract.service'


@Injectable({providedIn: 'root'})

@Component({
  selector: 'app-new-deals',
  templateUrl: './new-deals.component.html',
  styleUrls: ['./new-deals.component.css']
})
export class NewDealsComponent implements OnInit, OnDestroy {
  newContract : NewContract[] = [];
  private constractsSub: Subscription | undefined;
  userId: any
  size:any;
  user: UserDetails | undefined;
  emailOfPartner: any;
  constructor(public profileService: ProfileService,
    public authService: AuthService,
    public contractService: ContractService) {
      this.userId = ""
    }

  ngOnDestroy(): void {
    this.constractsSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.profileService.getNewContractById();
    this.contractService.getContractCount();
    this.constractsSub = this.profileService.getNewContractUpdatedListener().subscribe(( contracts : NewContract[]): void =>{
      this.newContract = contracts;
      this.size = contracts.length;
    })
    this.profileService.getHistoryByUserId();
    this.authService.getToken();
    this.userId = this.authService.getUserId();
    this.profileService.getUserDetailsByUserId(this.userId);
    this.constractsSub = this.profileService.getDetailsListener().subscribe(( user : UserDetails): void =>{
    this.user = user;
  })
  }
}


