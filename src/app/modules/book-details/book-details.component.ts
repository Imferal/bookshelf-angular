import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {BooksQuery} from "../../store/books/books.query";
import {Book} from "../../store/books/book.model";
import {Observable} from "rxjs";
import {Genre} from 'src/app/store/genres/genre.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book$!: Observable<Book | undefined>
  // combined!: string

  constructor(
    private route: ActivatedRoute,
    private booksQuery: BooksQuery
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.book$ = this.booksQuery.selectEntity(params.bookId)
    })

    // this.booksQuery.combinedStream.subscribe(([books]) => {
    //   this.combined = `Книги с жанрами: ${JSON.stringify(books)}`
    // })
  }
}
