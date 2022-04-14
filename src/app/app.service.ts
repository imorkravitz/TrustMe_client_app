import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public httpClient: HttpClient) { }


  getHomeScreen():Observable<any> { //since the data do not comes Immediately
    return this.httpClient.get('http://localhost:3000/home');
  }
}
