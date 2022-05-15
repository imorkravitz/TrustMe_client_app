export interface Contract{
  id : String | undefined;
  description : String;
  depositSeller : Number;
  depositBuyer : Number;
  email : String;
  date : Date;
}

export interface UserDetails{
  name : String;
  phone : String | undefined;
  email : String;
  image : File | undefined;
  }


export interface findContracts{
  id: String
}
