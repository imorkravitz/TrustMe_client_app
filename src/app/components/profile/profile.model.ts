export interface NewContract {
  id : String | undefined;
  description : String;
  depositSeller : Number;
  depositBuyer : Number;
  email : String;
  date : Date;
  buyerId : any;
  status: String;
}

export interface HistoryContract {
  id: String | undefined;
  description: String;
  depositSeller: Number;
  depositBuyer: Number;
  emailBuyer : String;
  emailSeller : String;
  date: Date;
  buyerId: any;
  status: String;
}

export interface UserDetails {
  fullName: String;
  nameToPatch: String;
  phone: String | undefined;
  email: String;
  image: File | undefined;
}

export interface findContracts {
  id: String;
}

export interface Recommendation {
  messageFrom: String;
  messageTo: String;
  content: String;
  senderName: String;
}
