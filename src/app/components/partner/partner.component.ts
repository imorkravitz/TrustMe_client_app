import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {
  panelOpenState = false;
  hidden = false;
  mobile: any;
  emailOfPartner : any;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  constructor(private _Activatedroute:ActivatedRoute) { }

  @HostListener("window:resize", ['$event'])
  private onResize(event: { target: { innerWidth: any; }; }): any {
    this.mobile = event.target.innerWidth;
  }

  ngOnInit(): void {
    this.mobile = window.innerWidth;
    // this.emailOfPartner = this._Activatedroute.snapshot.paramMap.get("id");
    // console.log(this.emailOfPartner);
    // import { ActivatedRoute } from '@angular/router';
    // private _Activatedroute:ActivatedRoute
  }
}
