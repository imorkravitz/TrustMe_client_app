import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Contract, findContracts, UserDetails } from './profile.model';
import { NotifierService } from '../notifier/notifier.service';

@Injectable({providedIn: 'root'})

export class ProfileService {
  private contracts : Contract[] = [];
  private userDetails : UserDetails = {name: '', phone: undefined, email: '',image: undefined};
  private contractUpdated = new Subject<Contract[]>();
  private details = new Subject<UserDetails>();
  private status: boolean = false;

constructor(private http: HttpClient, private router: Router,
  private notificationService: NotifierService) {}

getContractUpdatedListener() {
  return this.contractUpdated.asObservable();
}

getDetailsListener() {
  return this.details.asObservable();
}


getNewContractById(){
  this.http.get<{message: string, contracts: any}>('http://localhost:3000/api/contracts/getNewContractByUserId')
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
        status: contract.status
      };
    });
  }))
  .subscribe((transformedContract)=>{
    this.contracts = transformedContract;
    console.log("New")
    console.log(this.contracts);
    console.log("New")

    this.contractUpdated.next([...this.contracts]);
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
        status: contract.status
      };
    });
  }))
  .subscribe((transformedContract)=>{
    this.contracts = transformedContract;
    console.log("History")
    console.log(this.contracts);
    console.log("History")
    this.contractUpdated.next([...this.contracts]);
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
      this.userDetails.name = responseData.userDetails.firstName;
      this.userDetails.phone = responseData.userDetails.phoneNumber;
      this.userDetails.email = responseData.userDetails.email;
      // this.userDetails.image = responseData.userDetails.image;
      this.details.next(this.userDetails)
    },error=>{
      console.log("no transaction yet");

    })
  }
}
