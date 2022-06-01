import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from './profile.service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private _Activatedroute: ActivatedRoute,
    private profileService: ProfileService
    ) {}
  panelOpenState = false;
  hidden = false;
  mobile: any;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  @HostListener("window:resize", ['$event'])
  private onResize(event: { target: { innerWidth: any; }; }): any {
    this.mobile = event.target.innerWidth;
  }

  ngOnInit(): void {
    this.mobile = window.innerWidth;
  }

}
