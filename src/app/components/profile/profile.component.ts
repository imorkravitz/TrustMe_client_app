import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  panelOpenState = false;
  hidden = false;
  mobile: any;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  constructor() { }

  @HostListener("window:resize", ['$event'])
  private onResize(event: { target: { innerWidth: any; }; }): any {
    this.mobile = event.target.innerWidth;
  }

  ngOnInit(): void {
    this.mobile = window.innerWidth;
  }

}
