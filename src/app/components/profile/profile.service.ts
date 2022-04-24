import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Contract } from './profile.model';

@Injectable({providedIn: 'root'})


export class ProfileService {

  private contracts : Contract[] = [];
  private contractUpdated = new Subject<Contract[]>();

constructor(private http: HttpClient, private router: Router) {}

getContractUpdatedListener() {
  return this.contractUpdated.asObservable();
}

getAllContract() {
  //get data from a server to client(angular side)
  console.log("get contract4")
  this.http.get<{message: string, contracts: any}>('http://localhost:3000/api/contracts/getContracts')
  .pipe(map((contractData)=>{
    return contractData.contracts.map((contract: any) => {
      return {
        id: contract._id,
        side: contract.side,
        description: contract.description,
        deposit: contract.deposit,
        emailOfAnotherSide: contract.emailOfAnotherSide,
        date: contract.date
      };
    });
  }))
  .subscribe((transformedContract)=>{
    this.contracts = transformedContract;
    this.contractUpdated.next([...this.contracts]);
  })
  console.log("get contract5")
}

}
