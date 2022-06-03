import { Component , OnInit, OnDestroy} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service'
import { Subscription } from 'rxjs'
import { LoaderService } from '../loader/loader.service';
import { Router } from '@angular/router';
import { ContractService } from '../contract/contract.service'
import { NewDealsComponent } from '../profile/new-deals/new-deals.component'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy{

  isDarkTheme:boolean = false;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  size:any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  constructor(private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    public loaderService: LoaderService,
    private router: Router,
    public contractService: ContractService,
    public newDealsComponent:NewDealsComponent) {
    this.authListenerSubs = Subscription.EMPTY;
  }

  ngOnInit() {
    // this.size = this.newDealsComponent.getSize()
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.isDarkTheme = localStorage.getItem('theme') === "Dark" ? true : false;
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated:boolean) => {
       // this.userIsAuthenticated = true;
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['homepage']);
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  storeThemeSelection() {
    localStorage.setItem('theme', this.isDarkTheme ? "Dark" : "Light");
  }

}
