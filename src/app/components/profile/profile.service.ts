import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Contract, findContracts } from './profile.model';

@Injectable({providedIn: 'root'})

export class ProfileService {
  private contracts : Contract[] = [];
  private contractUpdated = new Subject<Contract[]>();
  private status: boolean = false;

constructor(private http: HttpClient, private router: Router) {}

getContractUpdatedListener() {
  return this.contractUpdated.asObservable();
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
        date: contract.date
      };
    });
  }))
  .subscribe((transformedContract)=>{
    console.log(transformedContract)
    this.contracts = transformedContract;
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
        date: contract.date
      };
    });
  }))
  .subscribe((transformedContract)=>{
    console.log(transformedContract)
    this.contracts = transformedContract;
    this.contractUpdated.next([...this.contracts]);
  })
}
}
