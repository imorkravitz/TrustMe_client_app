import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Contract } from '../profile.model';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-new-deals',
  templateUrl: './new-deals.component.html',
  styleUrls: ['./new-deals.component.css']
})
export class NewDealsComponent implements OnInit, OnDestroy {
  newContract : Contract[] = [];
  private constractsSub: Subscription | undefined;
  userId: any;

  constructor(public profileService: ProfileService,
    public authService: AuthService) {
      this.userId = ""
    }

  ngOnDestroy(): void {
    this.constractsSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.profileService.getNewContractById();
    this.constractsSub = this.profileService.getContractUpdatedListener().subscribe(( contracts : Contract[]): void =>{
      this.newContract = contracts;
    })
    this.authService.getToken();
    this.userId = this.authService.getUserId();
  }

}
