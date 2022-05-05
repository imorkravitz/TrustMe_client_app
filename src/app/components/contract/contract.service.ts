import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Contract } from './contract.model';

@Injectable({providedIn: 'root'})

export class ContractService {

  private contracts : Contract[] = [];
  private contractUpdated = new Subject<Contract[]>();

constructor(private http: HttpClient, private router: Router) {}

getContractUpdatedListener() {
  return this.contractUpdated.asObservable();
}


getContract(postId: string | null) {
}

deleteContract(postId: string | undefined) {

}

addContract(description: String,
  depositSeller: Number,
  depositBuyer: Number,
  walletAddressSeller: String,
  walletAddressBuyer: String,
  email: String,
  date: Date)
  {
    const contract : Contract ={
      id: undefined,
      description: description,
      depositSeller: depositSeller,
      depositBuyer: depositBuyer,
      walletAddressSeller: walletAddressSeller,
      walletAddressBuyer: walletAddressBuyer,
      email: email,
      date: date
    };

    this.http.post<{message: String, contractId : String}>('http://localhost:3000/api/contracts/add', contract)
    .subscribe((responseData)=>{
      console.log(responseData.message)
      contract.id = responseData.contractId;
      this.contracts.push(contract);
      this.contractUpdated.next([...this.contracts]);
    })
    console.log(contract);

}

getAllContract() {
  //get data from a server to client(angular side)
  this.http.get<{message: string, contracts: any}>('http://localhost:3000/api/contracts/getContracts')
  .pipe(map((contractData)=>{
    console.log(contractData);

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
        creator: contract.creator
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
