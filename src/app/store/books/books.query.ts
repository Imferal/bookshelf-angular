import {QueryEntity} from "@datorama/akita";
import {BooksState, BooksStore} from "./books.store";
import {combineLatest, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Book, FilterParams} from "./book.model";
import {GenresQuery} from "../genres/genres.query";
import {map} from "rxjs/operators";

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
    /** Фильтрация по вхождению */
    if (filterParams.text) {
      books = books.filter(book => {
        return book.name.toLocaleLowerCase().includes(filterParams.text!.toLocaleLowerCase().trim()) ||
        book.description?.toLocaleLowerCase().includes(filterParams.text!.toLocaleLowerCase().trim())
      })
    }

    /** Фильтрация по автору */
    if (filterParams.author) {
      books = books.filter(book => {
        return book.author.toLocaleLowerCase().includes(filterParams.author!.toLocaleLowerCase().trim())
      })
    }

    /** Фильтрация по году от */
    if (filterParams.yearFrom || filterParams.yearFrom === 0) {
      books = books.filter(book => {
        return book.year >= filterParams.yearFrom!
      })
    }

    /** Фильтрация по году до */
    if (filterParams.yearTo || filterParams.yearTo === 0) {
      books = books.filter(book => {
        return book.year <= filterParams.yearTo!
      })
    }

    /** Фильтрация по жанру */
    if (filterParams.genreIds) {
      books = books.filter(book => {
        return filterParams.genreIds!.every(genreId => book.genreIds.includes(genreId))
      })
    }

    return books
  }
}
