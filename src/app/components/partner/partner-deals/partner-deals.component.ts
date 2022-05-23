import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { NewContract } from '../partner.model';
import { PartnerService } from '../partner.service';

@Component({
  selector: 'app-partner-deals',
  templateUrl: './partner-deals.component.html',
  styleUrls: ['./partner-deals.component.css']
})
export class PartnerDealsComponent implements OnInit, OnDestroy {

  newContract : NewContract[] = [];
  private constractsSub: Subscription | undefined;
  userId: any;

  constructor(public partnerService: PartnerService,
    public authService: AuthService) {
      this.userId = ""
    }

  ngOnDestroy(): void {
    this.constractsSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.partnerService.getNewContractById();
    this.constractsSub = this.partnerService.getNewContractUpdatedListener().subscribe(( contracts : NewContract[]): void =>{
      this.newContract = contracts;
    })
    this.authService.getToken();
    this.userId = this.authService.getUserId();
  }
}
