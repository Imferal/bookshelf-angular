import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {Injectable} from "@angular/core";
import {IsAuth} from "./auth.model";
import {Utils} from "../../../utils";

export interface AuthState extends EntityState<IsAuth> {
}

const authInitialState = {
  isAuth: Utils.getAuthCookie('isAuth') === 'true',
}

@Injectable({providedIn: 'root'})
@StoreConfig({
  name: 'auth'
})
export class AuthStore extends EntityStore<AuthState> {
  constructor() {
    super(authInitialState);
  }
}
