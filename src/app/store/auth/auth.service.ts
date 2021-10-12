import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {Injectable} from '@angular/core';
import {BooksStore} from "../books/books.store";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(
    private router: Router,
    private bookStore: BooksStore
  ) {}

  /** Переключить статус авторизации */
  setAuthStatus(status: boolean): void {
    this.bookStore.update({isAuth: status})
    /** Сохраняем в куки статус авторизации сроком на неделю */
    document.cookie = `isAuth=${status}; max-age=25200`
    /** Возврат на главную, если false */
    this.router.navigate(['/'])
  }
}
