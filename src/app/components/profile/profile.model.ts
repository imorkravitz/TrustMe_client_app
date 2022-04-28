export interface Contract{
  id : String | undefined;
  side : String;
  description : String;
  deposit : Number;
  emailOfAnotherSide : String;
  date : Date;
}

export interface UserDetails{
name : String;
phone : String;
email : String;
image : File | undefined;
}
