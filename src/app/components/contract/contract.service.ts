import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Contract, findUser , ContractById, findTrade } from './contract.model';
import { NotifierService } from '../notifier/notifier.service'

@Injectable({providedIn: 'root'})

export class ContractService {

  private contracts : Contract[] = [];
  private contractUpdated = new Subject<Contract[]>();
  private statusUpdated = new Subject<any>();
  private email: String
  private creator: any
  private buyerId: any;
  private status:String;
  private counter:number = 0
  public buyerPay: Boolean = false;
  public sellerPay: Boolean = false;

constructor(private http: HttpClient,
  private router: Router,
  private notificationService: NotifierService) {
    this.email = ""
    this.buyerId = ""
    this.status="";
  }

getSellerPay(){
  return this.sellerPay;
}

getBuyerPay(){
  return this.buyerPay;
}

getContractCount() {
  return this.counter;
}

getContactStatus() {
  return this.contracts;
}

getStatusUpdate() {
  return this.statusUpdated.asObservable();
}

getContractUpdatedListener() {
  return this.contractUpdated.asObservable();
}

getContract(postId: string | null) {
}

deleteContract(postId: string | undefined) {
}

getBuyerId(){
  return this.buyerId;
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

updateContract(id: any){
  const trade : findTrade = {
    id : id
  }
  this.http.post<{id: any}>("http://localhost:3000/api/contracts/updateContract", trade).
  subscribe(
    response =>{
      console.log(response);
      const tradeId = response.id;
      return tradeId;
  },error=>{
    console.log("Error");
  })
}

updateSellerPay(id: any){
  const trade : findTrade = {
    id : id
  }
  this.http.post<{id: any}>("http://localhost:3000/api/contracts/updateSellerPay", trade).
  subscribe(
    response =>{
      console.log(response);
      const tradeId = response.id;
      return tradeId;
  },error=>{
    console.log("Error");
  })
}

updateBuyerPay(id: any){
  const trade : findTrade = {
    id : id
  }
  this.http.post<{id: any}>("http://localhost:3000/api/contracts/updateBuyerPay", trade).
  subscribe(
    response =>{
      console.log(response);
      const tradeId = response.id;
      return tradeId;
  },error=>{
    console.log("Error");
  })
}


addContract(description: String,
  depositSeller: Number,
  depositBuyer: Number,
  walletAddressSeller: String,
  walletAddressBuyer: String,
  email: String,
  date: Date,
  creator: any,
  buyerId: any)
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
      buyerId: buyerId,
      status: "Waiting",
      tradeAddress: undefined,
      buyerPay: false,
      sellerPay: false
    };

    this.http.post<{message: String, contractId : String, buyerId : any, userId : any}>('http://localhost:3000/api/contracts/add', contract)
    .subscribe((responseData)=>{
      contract.id = responseData.contractId;
      contract.buyerId = responseData.buyerId;
      console.log( responseData.buyerId)
      this.notificationService.showNotification('Contract sent successfully', 'OK', 'success');
      this.contracts.push(contract);
      this.contractUpdated.next([...this.contracts]);
      this.router.navigate(['/homepage']);
    },error=>{
      this.notificationService.showNotification('This user does not exist. Try again', 'OK', 'error');
    })
    console.log(contract);
}

getContractById(){
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
        buyerId: contract.buyerID,
        date: contract.date,
        status: contract.status,
        tradeAddress: contract.tradeAddress,
        buyerPay: contract.buyerPay,
        sellerPay: contract.sellerPay
      };
    });
  }))
  .subscribe((transformedContract)=>{
    console.log(transformedContract);
    this.contracts = transformedContract;
    this.contractUpdated.next([...this.contracts]);
    this.counter = this.contracts.length;
  })
}
}
