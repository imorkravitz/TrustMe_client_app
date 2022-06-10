import { AfterContentInit, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AppService } from '../../app.service'
import { Observable } from 'rxjs';
import { NotifierService } from '../notifier/notifier.service';
import { NavComponent } from '../nav/nav.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cards:any = [];
  cardsForHandset:any = [];
  cardsForWeb:any = [];

  isHandset: boolean = false;
  isHandsetObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }
      return false;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
    public appService: AppService,
    private notificationService: NotifierService,
    ) {}

  ngOnInit() {
    this.isHandsetObserver.subscribe(currentObserverValue => {
      this.isHandset = currentObserverValue;
      this.loadCards();
    })
    this.appService.getHomeScreen().subscribe(
    response=>{
      this.cardsForHandset = response.handsetCards;
        this.cardsForWeb = response.webCards;
        this.loadCards();
        // this.notificationService.showNotification('Data loaded successfully!', 'OK', 'success');

    },
    error=>{
      // alert('There was an error in reciving data from server.')
      this.notificationService.showNotification('There was an error in reciving data from server!', 'OK', 'error');
    })
  
  }


  loadCards() {
    this.cards = this.isHandset ? this.cardsForHandset : this.cardsForWeb;
  }

  getImage(imageName: any):any {
    return 'url(' + 'http://localhost:3000/images/' + imageName + '.png' + ')';
  }
}
