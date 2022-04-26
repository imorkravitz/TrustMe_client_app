import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service'
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LoaderService } from '../loader/loader.service';
import { map, shareReplay } from 'rxjs/operators';
import { RouterModule, Routes } from "@angular/router";
import {Router} from '@angular/router'; // import router from angular router


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {

  isDarkTheme:boolean = false;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    public loaderService: LoaderService,
    private router: Router) {
    this.authListenerSubs = Subscription.EMPTY;

  }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = true;
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  // if user is not authenticated >> will redirect to login component
  canActive(){
    if (!this.userIsAuthenticated) {
      this.router.navigate(['/login']);
    }
  }

}
