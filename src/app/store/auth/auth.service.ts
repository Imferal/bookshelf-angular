import {Router} from "@angular/router";
import {Injectable} from '@angular/core';
import {AuthStore} from "./auth.store";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(
    private router: Router,
    private authStore: AuthStore,
  ) {}

  /** Переключить статус авторизации */
  setAuthStatus(status: boolean): void {
    this.authStore.update({isAuth: status})
    /** Сохраняем в куки статус авторизации сроком на неделю */
    document.cookie = `isAuth=${status}; max-age=25200`
    /** Возврат на главную, если false */
    this.router.navigate(['/'])
  }
}
