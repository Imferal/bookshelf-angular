import {Component, OnInit} from '@angular/core';
import {BookStateService} from "./services/book-state.service";
import {Book, Genre} from "./models/BookState";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

/** Отписка от стримов перед уничтожением компонента */
@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  books!: Book[]
  genres!: Genre[]

  constructor(
    public bookState: BookStateService,
  ) {
  }

  ngOnInit() {
    /** Подписка на книги */
    this.bookState.books$.pipe(untilDestroyed(this)).subscribe((books$: Book[]) => {
      this.books = books$
    })
    /** Подписка на литературные жанры */
    this.bookState.genres$.pipe(untilDestroyed(this)).subscribe((genres$: Genre[]) => {
      this.genres = genres$
    })
  }

  editBook(book: Book) {
    this.bookState.editBook(book)
  }

  removeBook(id: number): void {
    this.bookState.removeBook(id)
  }


}
