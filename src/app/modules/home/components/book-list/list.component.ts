import { Component, OnInit } from '@angular/core';
import {BooksService} from "../../../../store/books/books.service";
import {Book} from "../../../../store/books/book.model";
import {BooksQuery} from "../../../../store/books/books.query";

@Component({
  selector: 'app-book-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
books!: Book[]

  constructor(
    private booksService: BooksService,
    public booksQuery: BooksQuery,
  ) { }

  ngOnInit(): void {
    this.booksQuery.filteredBooksWithGenres.subscribe((books ) => {
      // debugger
      this.books = books
    })
  }

  editBook(book: Book) {
    this.booksService.editBook(book)
  }

  removeBook(id: number): void {
    this.booksService.removeBook(id)
  }
}
