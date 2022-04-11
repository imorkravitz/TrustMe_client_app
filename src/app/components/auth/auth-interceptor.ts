import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthService } from "./auth.service";

@Injectable() // anotation
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // req can be any type of information, next from the middleware of node.js side aloows the intercept to next handle
    const authToken = this.authService.getToken(); //to get the token we stored there
    const authRequest = req.clone({ // clone that request
      headers: req.headers.set("Authorization", "Bearer " + authToken) // configuration of the request
    }); // because we extract the authorization from the backend and the value is the token
    return next.handle(authRequest);
  }
}
