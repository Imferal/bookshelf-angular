import {Injectable} from '@angular/core';
import {StateService} from "../store/state";
import {Observable} from "rxjs";
import {Book, BooksState, Genre} from "../models/BookState";
import {initialState} from "../store/initialState";

@Injectable({
  providedIn: 'root'
})
export class BookStateService extends StateService<BooksState> {
  books$: Observable<Book[]> = this.select(state => state.books)
  genres$: Observable<Genre[]> = this.select(state => state.genres)

  constructor() {
    super(initialState)
  }

  /** Добавляем книгу в state */
  addBook(book: Book): void {
    this.setState({books: [...this.state.books, book]})
    console.log('Книга добавлена: ', this.state.books)
  }

  /** Редактируем книгу */
  editBook(editedBook: Book): void {
    let editedBooks = this.state.books.map((book: Book) => {
      return book.id === editedBook.id ? editedBook: book
    })
    this.setState({books: [...editedBooks]})
    console.log('Книга изменена: ', this.state.books)
  }

  /** Удаляем книгу из state */
  removeBook(id: number): void {
    this.setState({
      books: [...this.state.books.filter(book => book.id !== id)]
    })
    console.log('Книга удалена: ', this.state.books)
  }
}
