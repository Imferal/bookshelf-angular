import {Injectable} from '@angular/core';
import { Book } from './book.model';
import {BooksStore} from "./books.store";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private bookStore: BooksStore,
  ) {
  }

  /** Добавляем книгу  */
  addBook(book: Book): void {
    this.bookStore.add(book)
  }

  /** Редактируем книгу */
  editBook(book: Book): void {
    this.bookStore.update(book.id, book)
  }

  /** Удаляем книгу из state */
  removeBook(id: number): void {
    this.bookStore.remove(id)
  }
}
