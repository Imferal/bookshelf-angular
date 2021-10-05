import { Component, OnInit } from '@angular/core';
import {BooksService} from "../../../../shared/services/books.service";
import {Book} from "../../../../models/BooksState";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  constructor(
    public books: BooksService,
  ) { }

  ngOnInit(): void {
  }

  editBook(book: Book) {
    this.books.editBook(book)
  }

  removeBook(id: number): void {
    this.books.removeBook(id)
  }

}
