import {Injectable} from '@angular/core';
import { Book } from './book.model';
import {BooksStore} from "./books.store";
import {BooksQuery} from "./books.query";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private store: BooksStore,
    private booksQuery: BooksQuery,
  ) {
  }

  /** Добавляем книгу  */
  addBook(book: Book): void {
    this.store.add(book)
  }

  /** Редактируем книгу */
  editBook(book: Book): void {
    this.store.update(book)
  }

  /** Удаляем книгу из state */
  removeBook(id: number): void {
    this.store.remove(id)
  }

  // /** Получаем книгу по id */
  // getBook(id: number): Subscription {
  //   return this.booksQuery.books$.subscribe(books => {
  //     return books.find((book: Book) => id === book.id)
  //   })
  // }


  // /** Редактируем книгу */
  // editBook(editedBook: Book): void {
  //   let editedBooks = this.state.books.map((book: Book) => {
  //     return book.id === editedBook.id ? editedBook: book
  //   })
  //   this.setState({books: [...editedBooks]})
  // }
  //
  // /** Удаляем книгу из state */
  // removeBook(id: number): void {
  //   this.setState({
  //     books: [...this.state.books.filter(book => book.id !== id)]
  //   })
  // }
}
