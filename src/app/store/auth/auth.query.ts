import {QueryEntity} from "@datorama/akita";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthState, AuthStore} from "./auth.store";

@Injectable({providedIn: 'root'})
export class AuthQuery extends QueryEntity<AuthState> {
  isAuth$: Observable<boolean> = this.select(entity => entity.isAuth)

  constructor(protected store: AuthStore) {
    super(store);
  }
}
