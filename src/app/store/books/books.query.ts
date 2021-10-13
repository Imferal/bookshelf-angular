import {QueryEntity} from "@datorama/akita";
import {BooksState, BooksStore} from "./books.store";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Book} from "./book.model";

@Injectable({providedIn: 'root'})
export class BooksQuery extends QueryEntity<BooksState> {
  books$: Observable<Book[]> = this.selectAll()

  constructor(protected store: BooksStore) {
    super(store);
  }
}
