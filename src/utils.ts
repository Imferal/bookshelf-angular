import {Book, FilterParams} from "./app/store/books/book.model";

export class Utils {

  /** Получение значения куки по ключу */
  static getAuthCookie(name: string) {
    const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  /******************
   * Фильтрация книг*
   * ****************/

  /** Фильтрация по вхождению */
  static textFilter(book: Book, filterParams: FilterParams) {
    if (filterParams.text) {
      return book.name.toLocaleLowerCase().includes(filterParams.text!.toLocaleLowerCase().trim()) ||
        book.description?.toLocaleLowerCase().includes(filterParams.text!.toLocaleLowerCase().trim())
    }
    return true
  }

  /** Фильтрация по автору */
  static authorFilter(book: Book, filterParams: FilterParams) {
    if (filterParams.author) {
      return book.author.toLocaleLowerCase().includes(filterParams.author!.toLocaleLowerCase().trim())
    }
    return true
  }

  /** Фильтрация по году от */
  static dateFromFilter(book: Book, filterParams: FilterParams) {
    if (filterParams.yearFrom || filterParams.yearFrom === 0) {
      return book.year >= filterParams.yearFrom!
    }
    return true
  }

  /** Фильтрация по году до */
  static dateToFilter(book: Book, filterParams: FilterParams) {
    if (filterParams.yearTo || filterParams.yearTo === 0) {
      return book.year <= filterParams.yearTo!
    }
    return true
  }

  /** Фильтрация по жанру   */
  static genreFilter(book: Book, filterParams: FilterParams) {
    if (filterParams.genreIds) {
      return filterParams.genreIds!.every(genreId => book.genreIds.includes(genreId))
    }
    return true
  }
}
