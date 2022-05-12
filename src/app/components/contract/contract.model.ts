export interface Contract{
  id : String | undefined;
  description : String;
  depositSeller : Number;
  depositBuyer : Number;
  walletAddressSeller: String;
  walletAddressBuyer: String;
  email : String;
  date : Date;
  creator: any;
}

export interface findUser{
  email: String
}

export interface ContractById{
  creator: any
}
