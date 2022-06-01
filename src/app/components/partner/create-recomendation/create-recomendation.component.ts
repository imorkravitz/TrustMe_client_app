import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PartnerService } from '../partner.service';
import { AuthService } from '../../auth/auth.service';
import { UserDetails } from '../partner.model';
import { ProfileService } from '../../profile/profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-recomendation',
  templateUrl: './create-recomendation.component.html',
  styleUrls: ['./create-recomendation.component.css'],
})
export class CreateRecomendationComponent implements OnInit, OnDestroy{
  [x: string]: any;
  constructor(
    public partnerService: PartnerService,
    public authService: AuthService,
    public profileService: ProfileService,
    private _Activatedroute:ActivatedRoute
  ) {}

  userId: any;
  user!: UserDetails;
  private userSub: Subscription | undefined;
  private partnerDetailsSub: Subscription | undefined;
  emailOfPartner: any;
  partnerDetails: any;

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.profileService.getUserDetailsByUserId(this.userId);
    this.userSub = this.profileService
      .getDetailsListener()
      .subscribe((user: UserDetails): void => {
        this.user = user;
      });
    this.emailOfPartner = this._Activatedroute.snapshot.paramMap.get("id");
    this.partnerService.getUserDetailsByEmail(this.emailOfPartner);
    this.partnerDetailsSub = this.partnerService.getDetailsListener().subscribe(( user : UserDetails): void =>{
      this.partnerDetails = user;
    })
  }

  onAddRecomendation(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.partnerService.addRecommendation(this.user.email, this.partnerDetails.email, form.value.message, this.user.fullName);
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.partnerDetailsSub?.unsubscribe();
  }
}
