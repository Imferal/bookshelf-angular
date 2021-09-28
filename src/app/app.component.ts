import {Component, OnInit} from '@angular/core';
import {Book, BookStateService} from "./services/book-state.service";

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
    this.bookState.books$.subscribe((books$: Book[]) => {
      this.books = books$
    })
  }

}
