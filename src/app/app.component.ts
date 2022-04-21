import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'trustMe-app';
  mediaSub:Subscription;
  deviveXs:boolean = false;
  constructor(public mediaObserver:MediaObserver){
    this.mediaSub = Subscription.EMPTY;

  }

  ngOnInit(){
    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=>{
      console.log(result.mqAlias);
      this.deviveXs = result.mqAlias === 'xs' ? true : false;
    })
  }

  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }
}
