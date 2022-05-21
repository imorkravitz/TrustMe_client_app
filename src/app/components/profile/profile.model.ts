export interface NewContract{
  id : String | undefined;
  description : String;
  depositSeller : Number;
  depositBuyer : Number;
  email : String;
  date : Date;
  buyerId : any;
}

export interface HistoryContract{
  id : String | undefined;
  description : String;
  depositSeller : Number;
  depositBuyer : Number;
  email : String;
  date : Date;
  buyerId : any;
}


export interface UserDetails{
  fullName : String ;
  nameToPatch : String;
  phone : String | undefined;
  email : String;
  image : File | undefined;
  }


export interface findContracts{
  id: String
}
