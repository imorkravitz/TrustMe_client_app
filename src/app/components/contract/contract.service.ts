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

// createcontent(email: string, password: string, confirmPassword: string, firstName: string,
//    lastName: string,birthDate: Date, phoneNumber: string){

//     const authData : AuthData = {
//       email: email,
//       password: password,
//       confirmPassword: confirmPassword,
//       firstName: firstName,
//       lastName: lastName,
//       birthDate: birthDate,
//       phoneNumber: phoneNumber,
//     }
//     this.http.
//     post("http://localhost:3000/api/users/signup",authData).
//     subscribe(response =>{
//       console.log(response);
//     })
//   }

getContract(postId: string | null) {
  // return [...this.posts.filter(post => post.id === postId)];
}

deleteContract(postId: string | undefined) {
  // this.http.delete("http://localhost:3000/api/posts/" + postId)
  // .subscribe(()=>{
  //    const tempPost = this.posts.filter(post => post.id !== postId)
  //    this.posts = tempPost;
  //    this.postUpdated.next([...this.posts]);
  // });
}

addContract(description: String, deposit: Number,
  email: String, date: Date, sellerId: String){
  const contract : Contract ={ id: undefined, description: description,
    deposit: deposit, email: email, date: date ,sellerId: sellerId};
  // // post data from client(angular side) to server
  this.http.post<{message: String, contractId : String}>('http://localhost:3000/api/contracts/add', contract)
  .subscribe((responseData)=>{
    console.log(responseData.message)
    contract.id = responseData.contractId;
    this.contracts.push(contract);
    this.contractUpdated.next([...this.contracts]);
  })
}

getAllContract() {
  //get data from a server to client(angular side)
  console.log("get contract2")
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
  console.log("get contract3")
}


}
