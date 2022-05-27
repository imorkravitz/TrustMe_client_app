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
  constructor(
    partnerService: PartnerService,
    public authService: AuthService,
    public profileService: ProfileService
  ) {}

  userId: any;
  user!: UserDetails;
  private constractsSub: Subscription | undefined;

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.profileService.getUserDetailsByUserId(this.userId);
    this.constractsSub = this.profileService
      .getDetailsListener()
      .subscribe((user: UserDetails): void => {
        this.user = user;
      });
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    console.log(form.value.message);

    // this.partnerService.addPost(form.value.title,form.value.content);
  }

  ngOnDestroy(): void {
    this.constractsSub?.unsubscribe();
  }
}
