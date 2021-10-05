import {Injectable} from '@angular/core';
import {StateService} from "../../store/state";
import {Observable} from "rxjs";
import {BooksState} from "../../models/BooksState";
import {initialState} from "../../store/initialState";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends StateService<BooksState> {
  isAuth$: Observable<boolean> = this.select(state => state.isAuth)

  constructor(
    private router: Router
  ) {
    super(initialState)
  }

  /** Переключить статус авторизации */
  setAuthStatus(status: boolean): void {
    this.setState({isAuth: status})
    /** Сохраняем в куки статус авторизации сроком на неделю */
    document.cookie = `isAuth=${status}; max-age=25200`
    /** Возврат на главную, если false */
    this.router.navigate(['/'])
  }
}
