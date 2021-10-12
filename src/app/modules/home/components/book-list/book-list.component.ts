import { Component, OnInit } from '@angular/core';
import {BooksService} from "../../../../store/books/books.service";
import {Book} from "../../../../store/books/book.model";
import {BooksQuery} from "../../../../store/books/books.query";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  constructor(
    private booksService: BooksService,
    public booksQuery: BooksQuery,
  ) { }

  ngOnInit(): void {
  }

  editBook(book: Book) {
    this.booksService.editBook(book)
  }

  removeBook(id: number): void {
    this.booksService.removeBook(id)
  }

}
