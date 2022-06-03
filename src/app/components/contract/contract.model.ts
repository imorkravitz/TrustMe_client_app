export interface Contract{
  id : String | undefined;
  description : String;
  depositSeller : Number;
  depositBuyer : Number;
  walletAddressSeller: String;
  walletAddressBuyer: String;
  emailBuyer : any;
  emailSeller : any;
  date : Date;
  creator: any;
  buyerId: any;
  status: any;
  tradeAddress: any | undefined;
  buyerPay: Boolean ;
  sellerPay: Boolean ;
  escrowId : Number | undefined;
}

export interface findUser{
  email: String
}

export interface findTrade{
  id: any
}

export interface ContractById{
  creator: any
}
