import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  myImage : String = "assets/aboutUs.jpg";
  myImage2 : String = "assets/aboutUs2.jpg";
  mobile : any;
  constructor() { }

  @HostListener("window:resize", ['$event'])
  private onResize(event: { target: { innerWidth: any; }; }): any {
    this.mobile = event.target.innerWidth;
  }

  ngOnInit(): void {
    this.mobile = window.innerWidth;
  }

  getImage():any {
    return 'url(' + 'http://localhost:3000/images/aboutUs.png'+')';
  }

}
