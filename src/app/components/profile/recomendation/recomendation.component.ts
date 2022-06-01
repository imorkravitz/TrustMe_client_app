import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Recommendation } from '../profile.model';
import { ProfileService } from '../profile.service';
import { PartnerService } from '../../partner/partner.service'

@Component({
  selector: 'app-recomendation',
  templateUrl: './recomendation.component.html',
  styleUrls: ['./recomendation.component.css']
})
export class RecomendationComponent implements OnInit, OnDestroy {

  constructor(public profileService: ProfileService,
    public authService: AuthService,
    public partnerService:PartnerService ,
    ) {
      this.email = ""
    }

  private recomendationSub: Subscription | undefined;
  email: any;
  recommendations : Recommendation[] = [];

  ngOnInit(): void {
    this.email = this.authService.getEmail();
    this.authService.getToken();
    this.profileService.getRecommendationByEmail(this.email);
    this.authService.getToken();
    this.authService.getAuthData();
    this.authService.getAuthStatusListener();
    this.recomendationSub = this.profileService.getRecommendationListener().subscribe(( recommendations : Recommendation[]): void =>{
      this.recommendations = recommendations;
      console.log(recommendations)

    })
  }

  ngOnDestroy(): void {
    this.recomendationSub?.unsubscribe();
  }
}
