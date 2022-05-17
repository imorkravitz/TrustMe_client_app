import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { AuthService } from './components/auth/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'trustMe-app';
  mediaSub:Subscription;
  deviveXs:boolean = false;
  constructor(public mediaObserver:MediaObserver,
    private authService:AuthService,
    private router: Router ){

    this.mediaSub = Subscription.EMPTY;
  }

  ngOnInit(){ // when the app is run this is the first component that reloads
    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=>{
      console.log(result.mqAlias);
      this.deviveXs = result.mqAlias === 'xs' ? true : false;
    })

    this.authService.autoAuthUser();
  }

  ngOnDestroy(){
    this.mediaSub.unsubscribe();
  }

  isHomeRoute(){
    return this.router.url == '/';
  }
}
