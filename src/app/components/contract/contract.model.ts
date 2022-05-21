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
  tradeAddress: any | undefined;
  buyerPay: Boolean ;
  sellerPay: Boolean ;
}

export interface findUser{
  email: String
}

export interface ContractById{
  creator: any
}
