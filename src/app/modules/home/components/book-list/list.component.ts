import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../../../store/books/books.service";
import {Book} from "../../../../store/books/book.model";
import {BooksQuery} from "../../../../store/books/books.query";
import {BooksState} from "../../../../store/books/books.store";
import {AkitaFilterLocal} from "akita-filters-plugin";
import { Observable } from 'rxjs';
import {BooksFilterService} from "../../../../shared/services/books-filter.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  books!: Book[]
  public filters$!: Observable<AkitaFilterLocal<Book, BooksState>[]>;

  constructor(
    private booksService: BooksService,
    public booksQuery: BooksQuery,
    private booksFilter: BooksFilterService,
  ) {
  }

  ngOnInit(): void {
      this.booksFilter.selectAll().subscribe(books => {
        this.books = books as Book[]
      })
  }

  editBook(book: Book) {
    this.booksService.editBook(book)
  }

  removeBook(id: number): void {
    this.booksService.removeBook(id)
  }
}
