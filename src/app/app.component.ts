import {Component, OnInit} from '@angular/core';
import {BookStateService} from "./services/book-state.service";
import {Book} from "./models/BookState";
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

  constructor(
    public bookState: BookStateService,
  ) {
  }

  ngOnInit() {
    this.bookState.books$.pipe(untilDestroyed(this)).subscribe((books$: Book[]) => {
      this.books = books$
    })
  }

  removeBook(id: number): void {
    this.bookState.removeBook(id)
  }


}
