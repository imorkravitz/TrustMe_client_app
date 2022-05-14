import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Contract, findUser , ContractById } from './contract.model';
import { NotifierService } from '../notifier/notifier.service'

@Injectable({providedIn: 'root'})

export class ContractService {

  private contracts : Contract[] = [];
  private contractUpdated = new Subject<Contract[]>();
  private email: String
  private creator: any

constructor(private http: HttpClient,
  private router: Router,
  private notificationService: NotifierService) {
    this.email = ""
  }

getContractUpdatedListener() {
  return this.contractUpdated.asObservable();
}

getContract(postId: string | null) {
}

deleteContract(postId: string | undefined) {

}

// check if email user exist in database, case not will notifier error messeage to the client
findUserEmail(email: String){
  const user : findUser = {
    email : email
  }

  this.http.post<{email: String}>("http://localhost:3000/api/users/findUser", user).
  subscribe(
    response =>{
      console.log(response);
      const userEmail = response.email;
      return userEmail
  },error=>{
    this.notificationService.showNotification('This user does not exist. Try again', 'OK', 'error');
  })
}


addContract(description: String,
  depositSeller: Number,
  depositBuyer: Number,
  walletAddressSeller: String,
  walletAddressBuyer: String,
  email: String,
  date: Date,
  creator: any)
  {
    const contract : Contract ={
      id: undefined,
      description: description,
      depositSeller: depositSeller,
      depositBuyer: depositBuyer,
      walletAddressSeller: walletAddressSeller,
      walletAddressBuyer: walletAddressBuyer,
      email: email,
      date: date,
      creator: creator,
    };

    this.http.post<{message: String, contractId : String}>('http://localhost:3000/api/contracts/add', contract)
    .subscribe((responseData)=>{
      console.log(responseData.message)
      contract.id = responseData.contractId;
      this.notificationService.showNotification('Contract sent successfully', 'OK', 'success');
      this.contracts.push(contract);
      this.contractUpdated.next([...this.contracts]);
      this.router.navigate(['/homepage']);
    },error=>{
      this.notificationService.showNotification('This user does not exist. Try again', 'OK', 'error');
    })
    console.log(contract);
}

// getAllContract() {
//   //get data from a server to client(angular side)
//   this.http.get<{message: string, contracts: any}>('http://localhost:3000/api/contracts/getContracts')
//   .pipe(map((contractData)=>{
//     console.log(contractData);

//     return contractData.contracts.map((contract: any) => {
//       return {
//         id: contract._id,
//         description: contract.description,
//         depositSeller: contract.depositSeller,
//         depositBuyer: contract.depositBuyer,
//         walletAddressSeller: contract.walletAddressSeller,
//         walletAddressBuyer: contract.walletAddressBuyer,
//         email: contract.email,
//         date: contract.date
//       };
//     });
//   }))
//   .subscribe((transformedContract)=>{
//     console.log(transformedContract)
//     this.contracts = transformedContract;
//     this.contractUpdated.next([...this.contracts]);
//   })
// }


getContractById(){
  this.http.get<{message: string, contracts: any}>('http://localhost:3000/api/contracts/getNewContractByUserId')
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
