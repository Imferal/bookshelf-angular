import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../shared/services/books.service";
import {ActivatedRoute, Params} from "@angular/router";
import { Book } from '../../models/BooksState';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book!: Book | undefined

  constructor(
    private books: BooksService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.book = this.books.getBook(+params.bookId)
    })
  }
}
