import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Recommendation } from '../profile.model';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-recomendation',
  templateUrl: './recomendation.component.html',
  styleUrls: ['./recomendation.component.css']
})
export class RecomendationComponent implements OnInit {

  constructor(public profileService: ProfileService,
    public authService: AuthService ) {
      this.userId = ""
    }

  private recomendationSub: Subscription | undefined;
  email: any;
  recommendations : Recommendation[] = [];
  userId: string;


  ngOnInit(): void {
    this.email = this.authService.getEmail()
    this.profileService.getRecommendationByEmail(this.email);
    this.recomendationSub = this.profileService.getRecommendationListener().subscribe(( recommendations : Recommendation[]): void =>{
      this.recommendations = recommendations;
      console.log(recommendations)
    })
  }

}
