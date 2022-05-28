export interface NewContract {
  id: String | undefined;
  description: String;
  depositSeller: Number;
  depositBuyer: Number;
  email: String;
  date: Date;
  buyerId: any;
  status: String;
}

export interface HistoryContract {
  id: String | undefined;
  description: String;
  depositSeller: Number;
  depositBuyer: Number;
  email: String;
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

// <form *ngIf="this.recommendations.length >= 0">
// <mat-card class="card" *ngFor="let rec of this.recommendations">
//   <mat-card-header>
//   <div mat-card-avatar class="example-header-image"></div>
//   <mat-card-title>
//     <a>{{rec.messageFrom}}</a>
//   </mat-card-title>
//   <mat-card-subtitle>
//     <a>{{rec.content}}</a>
//   </mat-card-subtitle>
//   </mat-card-header>
// </mat-card>
// </form>
