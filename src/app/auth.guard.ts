import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "./shared/services/auth.service";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  authStatus!: boolean

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.isAuth$.pipe(
      map((status: boolean) => {
        if (status) {
          return true
        }
        this.router.navigate(['/'], {
          queryParams: {
            auth: false
          }
        })
        return false
      })
    )
  }
}
