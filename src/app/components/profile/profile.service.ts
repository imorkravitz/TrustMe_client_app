import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HistoryContract, findContracts, UserDetails, NewContract, Recommendation } from './profile.model';
import { NotifierService } from '../notifier/notifier.service';

@Injectable({providedIn: 'root'})

export class ProfileService {
  private HistoryContract : HistoryContract[] = [];
  private NewContract : NewContract[] = [];
  private NewContractUpdated = new Subject<NewContract[]>();
  private HistoryContractUpdated = new Subject<HistoryContract[]>();
  private details = new Subject<UserDetails>();
  private userDetails : UserDetails = {fullName: "", nameToPatch: '',phone: undefined, email: '',image: undefined};
  private status: boolean = false;
  private recommendations : Recommendation[] =[];
  private recommendationUpdate = new Subject<Recommendation[]>();

constructor(private http: HttpClient, private router: Router,
  private notificationService: NotifierService) {}

getNewContractUpdatedListener() {
  return this.NewContractUpdated.asObservable();
}

getHistoryContractUpdatedListener() {
  return this.HistoryContractUpdated.asObservable();
}

getDetailsListener() {
  return this.details.asObservable();
}

getRecommendationListener(){
  return this.recommendationUpdate.asObservable();
}

getNewContractById(){
  this.http.get<{message: string, contracts: any}>('http://localhost:3000/api/contracts/getNewContractByUserId')
  .pipe(map((contractData)=>{

    if(contractData === null)
       return null;

    return contractData.contracts.map((contract: any) => {
      return {
        id: contract._id,
        description: contract.description,
        depositSeller: contract.depositSeller,
        depositBuyer: contract.depositBuyer,
        walletAddressSeller: contract.walletAddressSeller,
        walletAddressBuyer: contract.walletAddressBuyer,
        email: contract.email,
        date: contract.date,
        buyerId: contract.buyerId,
        status: contract.status
      };
    });
  }))
  .subscribe((transformedContract)=>{
    this.NewContract = transformedContract;
    this.NewContractUpdated.next([...this.NewContract]);
  })
}


getReccomendations(){
  this.http.get<{message: string, recommendations: any}>('http://localhost:3000/api/recommendation/getAllRecommandations')
  .pipe(map((postData)=>{
    if(postData === null)
       return null;
    return postData.recommendations.map((message: any) => {
      return {
        messageFrom: message.messageFrom,
        messageTo: message.messageTo,
        content:  message.content,
        senderName:  message.senderName
      };
    });
  }))
  .subscribe((transformedMessage)=>{
    this.recommendations = transformedMessage;
      this.recommendationUpdate.next([...this.recommendations]);
  })
}





getHistoryByUserId(){
  this.http.get<{message: string, contracts: any}>('http://localhost:3000/api/contracts/getHistoryByUserId')
  .pipe(map((contractData)=>{

    return contractData.contracts.map((contract: any) => {

      return {
        id: contract._id,
        description: contract.description,
        depositSeller: contract.depositSeller,
        depositBuyer: contract.depositBuyer,
        walletAddressSeller: contract.walletAddressSeller,
        walletAddressBuyer: contract.walletAddressBuyer,
        email: contract.email,
        date: contract.date,
        buyerId: contract.buyerId,
        status: contract.status,
      };
    });
  }))
  .subscribe((transformedContract)=>{
    this.HistoryContract = transformedContract;
    this.HistoryContractUpdated.next([...this.HistoryContract]);
  })
}

  getUserDetailsByUserId(userId : string)
  {
    const temp : any = {
      userId: userId
    }

    this.http.post<{message: String, userDetails : any}>('http://localhost:3000/api/users/getUserDetailsByUserId',temp)
    .subscribe((responseData)=>{
      this.userDetails.fullName = responseData.userDetails.firstName + ' ' + responseData.userDetails.lastName;
      this.userDetails.nameToPatch = responseData.userDetails.firstName
      this.userDetails.phone = responseData.userDetails.phoneNumber;
      this.userDetails.email = responseData.userDetails.email;
      // this.userDetails.image = responseData.userDetails.image;
      this.details.next(this.userDetails)
    },error=>{
      console.log("No transaction yet");

    })
  }

  getRecommendationByEmail(email : String) {
    const temp : any = {
      email: email,
    }
    this.http.post<{recommendations: any}>('http://localhost:3000/api/recommendation/getRecommendationByEmail', temp)
    .pipe(map((postData)=>{
      return postData.recommendations.map((message: any) => {

        return {
          messageFrom: message.messageFrom,
          messageTo: message.messageTo,
          content:  message.content,
          senderName:  message.senderName
        };
      });
    }))
    .subscribe((transformedMessage)=>{
      this.recommendations = transformedMessage;
      this.recommendationUpdate.next([...this.recommendations]);
    })
  }
}


