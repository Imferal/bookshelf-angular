import {QueryEntity} from "@datorama/akita";
import {BooksState, BooksStore} from "./books.store";
import {combineLatest, Observable} from "rxjs";
import {Injectable, OnInit} from "@angular/core";
import {Book} from "./book.model";
import {GenresQuery} from "../genres/genres.query";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class BooksQuery extends QueryEntity<BooksState> implements OnInit {
  books$: Observable<Book[]> = this.selectAll()
  combinedStream: Observable<Book[]> = combineLatest([
    this.books$,
    /** Жанры превращаем в объекты с ключами, взятыми из значений id */
    this.genresQuery.selectAll({asObject: true})
  ])
    .pipe(
      map(([books, genres]) => {
        return books.map(book => {
          return {
            ...book,
            /** Возвращаем значения жанров с ключами, совпадающими с genreIds в книге */
            genres: book.genreIds.map(genreId => genres[genreId])
          }
        })
      })
    )

  constructor(
    protected store: BooksStore,
    public genresQuery: GenresQuery,
  ) {
    super(store);
  }

  ngOnInit(): void {

  }

}
