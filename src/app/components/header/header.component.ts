import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service'
import { Subscription } from 'rxjs'
import { NotifierService } from '../notifier/notifier.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  //only if user authenticated we can do something... ngIf in html
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService){
    this.authListenerSubs = Subscription.EMPTY;
  }

  ngOnInit() {
    // this.userIsAuthenticated = this.authService.getIsAuth();
    // this.authListenerSubs = this.authService
    //   .getAuthStatusListener()
    //   .subscribe(isAuthenticated => {
    //     this.userIsAuthenticated = true;
    //     this.userIsAuthenticated = isAuthenticated;
    //   });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
