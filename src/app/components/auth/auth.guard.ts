import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router"
import { Observable } from "rxjs/"
import { Injectable } from "@angular/core"
import { AuthService } from "./auth.service"

@Injectable()

export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService,
    private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAute = this.authService.getIsAuth();
    if (!isAute) {
      this.router.navigate(['/login']) // if you are not login route to login
    }
    return isAute;
  }
}
