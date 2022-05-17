export interface Contract{
  id : String | undefined;
  description : String;
  depositSeller : Number;
  depositBuyer : Number;
  walletAddressSeller: String;
  walletAddressBuyer: String;
  email : any;
  date : Date;
  creator: any;
  buyerId: any;
  status: any;
}

export interface findUser{
  email: String
}

export interface ContractById{
  creator: any
}
