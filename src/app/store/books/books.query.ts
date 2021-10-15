import {QueryEntity} from "@datorama/akita";
import {BooksState, BooksStore} from "./books.store";
import {combineLatest, Observable, Subscription, zip} from "rxjs";
import {Injectable, OnInit} from "@angular/core";
import {Book} from "./book.model";
import {GenresQuery} from "../genres/genres.query";
import { Genre } from "../genres/genre.model";

@Injectable({providedIn: 'root'})
export class BooksQuery extends QueryEntity<BooksState> implements OnInit {
  books$: Observable<Book[]> = this.selectAll()
  combinedStream: Observable<[Book[], Genre[]]> = combineLatest(this.books$, this.genresQuery.genres$)

  constructor(
    protected store: BooksStore,
    public genresQuery: GenresQuery,
  ) {
    super(store);
  }

  ngOnInit(): void {

  }

}
