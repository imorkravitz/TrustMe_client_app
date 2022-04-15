export interface Contract{
  id : String | undefined;
  side : String;
  description : String;
  deposit : Number;
  emailOfAnotherSide : String;
  date : Date;
}
