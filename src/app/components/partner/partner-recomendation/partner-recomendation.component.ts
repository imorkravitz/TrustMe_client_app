import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { PartnerService } from '../partner.service';
import { Subscription } from 'rxjs';
import { Recommendation } from '../partner.model';

@Component({
  selector: 'app-partner-recomendation',
  templateUrl: './partner-recomendation.component.html',
  styleUrls: ['./partner-recomendation.component.css'],
})
export class PartnerRecomendationComponent implements OnInit, OnDestroy {
  constructor(
    private partnerService: PartnerService,
    private authService: AuthService,
    private _Activatedroute: ActivatedRoute
  ) {}

  private recomendationSub: Subscription | undefined;
  emailOfPartner: any;
  recommendations : Recommendation[] = [];

  ngOnInit(): void {
    this.emailOfPartner = this._Activatedroute.snapshot.paramMap.get("id");
    this.partnerService.getRecommendationByEmail(this.emailOfPartner);
    this.recomendationSub = this.partnerService.getRecommendationListener().subscribe(( recommendations : Recommendation[]): void =>{
      this.recommendations = recommendations;
      console.log(recommendations)
    })
  }

  ngOnDestroy(): void {
    this.recomendationSub?.unsubscribe();
  }
}
