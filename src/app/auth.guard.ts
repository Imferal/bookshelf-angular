import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";
import {AuthQuery} from "./store/auth/auth.query";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  authStatus!: boolean

  constructor(
    private authQuery: AuthQuery,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authQuery.isAuth$.pipe(
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
