// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { finalize } from 'rxjs/operators';
// import { ContractList } from './contract-list.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class InterceptorService1 implements HttpInterceptor {

//   constructor(public contractList: ContractList) { }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     this.contractList.confirmContract.next(true);
//     this.contractList.buyerPayed.next(true);
//     this.contractList.sellerPayed.next(true);

//     return next.handle(req).pipe(
//       finalize(
//         () => {
//           this.contractList.confirmContract.next(true);
//           this.contractList.buyerPayed.next(true);
//           this.contractList.sellerPayed.next(true);
//         }
//       )
//     );
//   }
// }
