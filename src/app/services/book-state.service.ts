import {Injectable} from '@angular/core';
import {StateService} from "../store/state";
import {Observable} from "rxjs";
import {Book, BooksState, Genre} from "../models/BookState";
import {initialState} from "../store/initialState";

@Injectable({
  providedIn: 'root'
})
export class BookStateService extends StateService<BooksState> {
  /** Создаём наблюдателей за состоянием нужных свойств в state */
  /** Вова из прошлого пишет тебе, Вова из настоящего, пояснение для тупых: */
  /** тут мы с помощью колбека достаём из стейта нужные свойства */
  /** Мы просто мапим весь стейт, фильтруя его по нужному свойству */
  books$: Observable<Book[]> = this.select(state => state.books)
  genres$: Observable<Genre[]> = this.select(state => state.genres)

  constructor() {
    super(initialState)
  }

  /** Добавляем книгу в state */
  addBook(book: Book): void {
    this.setState({books: [book, ...this.state.books]})
  }

  /** Редактируем книгу */
  editBook(editedBook: Book): void {
    let editedBooks = this.state.books.map((book: Book) => {
      return book.id === editedBook.id ? editedBook: book
    })
    this.setState({books: [...editedBooks]})
  }

  /** Удаляем книгу из state */
  removeBook(id: number): void {
    this.setState({
      books: [...this.state.books.filter(book => book.id !== id)]
    })
  }
}
