import {QueryEntity} from "@datorama/akita";
import {BooksState, BooksStore} from "./books.store";
import {combineLatest, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Book, FilterParams} from "./book.model";
import {GenresQuery} from "../genres/genres.query";
import {map} from "rxjs/operators";
import {Utils} from "../../../utils";

@Injectable({providedIn: 'root'})
export class BooksQuery extends QueryEntity<BooksState> {
  filter$: Observable<FilterParams> = this.select(entity => entity.filterParams)
  books$: Observable<Book[]> = this.selectAll()
  combinedStream: Observable<Book[]> = combineLatest([
    this.books$,
    /** Жанры превращаем в объекты с ключами, взятыми из значений id */
    this.genresQuery.selectAll({asObject: true}),
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
  filteredBooksWithGenres: Observable<Book[]> = combineLatest([
    this.combinedStream,
    this.filter$,
  ]).pipe(
    map(result => this.getFilteredBooks(...result))
  )

  constructor(
    protected store: BooksStore,
    public genresQuery: GenresQuery,
  ) {
    super(store);
  }

  getFilteredBooks(books: Book[], filterParams: FilterParams): Book[] {
    return books.filter((book) => {
      return !!(
        Utils.textFilter(book, filterParams) &&
        Utils.authorFilter(book, filterParams) &&
        Utils.dateFromFilter(book, filterParams) &&
        Utils.dateToFilter(book, filterParams) &&
        Utils.genreFilter(book, filterParams)
      )
    })
  }
}
