import { Injectable } from '@angular/core';
import {AkitaFilterLocal, AkitaFiltersPlugin} from "akita-filters-plugin";
import {BooksState} from "../../store/books/books.store";
import {BooksQuery} from "../../store/books/books.query";
import {Observable} from "rxjs";
import {Book} from "../../store/books/book.model";
import {HashMap} from "@datorama/akita";

@Injectable({
  providedIn: 'root'
})
export class BooksFilterService {
  booksFilter: AkitaFiltersPlugin<BooksState>

  constructor(
    private booksQuery: BooksQuery
  ) {
    this.booksFilter = new AkitaFiltersPlugin<BooksState>(booksQuery)
  }

  setFilter( filter: AkitaFilterLocal<BooksState> ) {
    this.booksFilter.setFilter(filter);
  }

  removeFilter( id: string ): void {
    this.booksFilter.removeFilter(id)
  }

  removeAllFilter() {
    this.booksFilter.clearFilters()
  }

  selectAll(): Observable<HashMap<Book> | Book[]> {
    return this.booksFilter.selectAllByFilters()
  }
}
