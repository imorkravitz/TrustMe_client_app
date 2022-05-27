import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HistoryContract, findContracts, UserDetails, NewContract } from './partner.model';
import { NotifierService } from '../notifier/notifier.service';

@Injectable({providedIn: 'root'})

// במקום להוציא את המידע לפי היוזר אידי נוציא לפי האימייל
export class PartnerService {
  private HistoryContract : HistoryContract[] = [];
  private NewContract : NewContract[] = [];
  private userDetails : UserDetails = {fullName: "", nameToPatch: '',phone: undefined, email: '',image: undefined};
  private NewContractUpdated = new Subject<NewContract[]>();
  private HistoryContractUpdated = new Subject<HistoryContract[]>();
  private details = new Subject<UserDetails>();
  private status: boolean = false;

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


getNewContractByEmail(partner: any){
  const temp : any = {
    partner: partner,
  }
  this.http.post<{message: string, contracts: any}>('http://localhost:3000/api/contracts/getNewContractByEmail',temp)
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
    console.log("New")
    console.log(this.NewContract);
    console.log("New")

    this.NewContractUpdated.next([...this.NewContract]);
  })
}

getHistoryByEmail(partner: any){
  const temp : any = {
    partner: partner,
  }
  this.http.post<{message: string, contracts: any}>('http://localhost:3000/api/contracts/getHistoryByEmail',temp)
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
    console.log("History")
    console.log(this.HistoryContract);
    console.log("History")
    this.HistoryContractUpdated.next([...this.HistoryContract]);
  })
}

  getUserDetailsByEmail(partner : string)
  {
    const temp : any = {
      partner: partner,
    }

    this.http.post<{message: String, userDetails : any}>('http://localhost:3000/api/users/getUserDetailsByEmail',temp)
    .subscribe((responseData)=>{
      // console.log(responseData.message)
      // console.log(responseData.userDetails)
      this.userDetails.fullName = responseData.userDetails.firstName + ' ' + responseData.userDetails.lastName;
      this.userDetails.nameToPatch = responseData.userDetails.firstName;
      this.userDetails.phone = responseData.userDetails.phoneNumber;
      this.userDetails.email = responseData.userDetails.email;
      // this.userDetails.image = responseData.userDetails.image;
      this.details.next(this.userDetails)
    },error=>{
      console.log("no transaction yet");

    })
  }

  getUserDetailsByUserId(userId : string)
  {
    const temp : any = {
      userId: userId
    }

    this.http.post<{message: String, userDetails : any}>('http://localhost:3000/api/users/getUserDetailsByUserId',temp)
    .subscribe((responseData)=>{
      // console.log(responseData.message)
      // console.log(responseData.userDetails)
      this.userDetails.fullName = responseData.userDetails.firstName + ' ' + responseData.userDetails.lastName;
      this.userDetails.nameToPatch = responseData.userDetails.firstName
      this.userDetails.phone = responseData.userDetails.phoneNumber;
      this.userDetails.email = responseData.userDetails.email;
      // this.userDetails.image = responseData.userDetails.image;
      this.details.next(this.userDetails)
    },error=>{
      console.log("no transaction yet");

    })
  }
}
