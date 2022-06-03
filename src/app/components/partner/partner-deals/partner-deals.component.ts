import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { NewContract } from '../partner.model';
import { PartnerService } from '../partner.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-partner-deals',
  templateUrl: './partner-deals.component.html',
  styleUrls: ['./partner-deals.component.css']
})
export class PartnerDealsComponent implements OnInit, OnDestroy {

  newContract : NewContract[] = [];
  private constractsSub: Subscription | undefined;
  userId: any;
  emailOfPartner: any;

  constructor(public partnerService: PartnerService,
    public authService: AuthService,
    private _Activatedroute:ActivatedRoute) {
      this.userId = ""
    }

  ngOnDestroy(): void {
    this.constractsSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.emailOfPartner = this._Activatedroute.snapshot.paramMap.get("id");

    this.partnerService.getNewContractByEmail(this.emailOfPartner);
    this.constractsSub = this.partnerService.getNewContractUpdatedListener().subscribe(( contracts : NewContract[]): void =>{
      this.newContract = contracts;
      console.log(this.newContract + "2222222")
    })
    this.authService.getToken();
    this.userId = this.authService.getUserId();
  }
}
