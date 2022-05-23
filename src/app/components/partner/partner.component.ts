import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {
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
