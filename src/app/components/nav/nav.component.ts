import { Component , OnInit, OnDestroy} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service'
import { Subscription } from 'rxjs'
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy{

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
    public loaderService: LoaderService) {
    this.authListenerSubs = Subscription.EMPTY;

  }

  ngOnInit() {
    this.isDarkTheme = localStorage.getItem('theme') === "Dark" ? true : false;

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = true;
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  storeThemeSelection() {
    localStorage.setItem('theme', this.isDarkTheme ? "Dark" : "Light");
  }

  notification(){
    return 3;
  }

}
