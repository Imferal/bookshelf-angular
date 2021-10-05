import {Genre} from "./app/models/BooksState";

export class Utils {
  /** Конвертируем массив названий жанров в массив объектов название + id */
  static setBookGenres(genreNames: string[], genres: Genre[]): Genre[] {
    return genreNames.map((genre: string) => {
      return genres.find((g: Genre) => genre === g.id)!
    })
  }

  /** Получение значения куки по ключу */
  static getAuthCookie(name: string) {
    const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
}
