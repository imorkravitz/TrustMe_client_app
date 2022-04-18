import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  myImage : String = "assets/aboutUs.jpg";
  myImage2 : String = "assets/aboutUs2.jpg";
  constructor() { }

  ngOnInit(): void {
  }

  getImage():any {
    return 'url(' + 'http://localhost:3000/images/aboutUs.png'+')';
  }

}
