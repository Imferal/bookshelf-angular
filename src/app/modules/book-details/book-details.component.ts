import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {BooksQuery} from "../../store/books/books.query";
import {Book} from "../../store/books/book.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book$!: Observable<Book | undefined>

  constructor(
    private route: ActivatedRoute,
    private booksQuery: BooksQuery
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.book$ = this.booksQuery.selectEntity(params.bookId)
    })
  }
}
