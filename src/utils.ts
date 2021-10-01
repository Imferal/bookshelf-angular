import {Genre} from "./app/models/BookState";

export class Utils {
  /** Конвертируем массив названий жанров в массив объектов название + id */
  static setBookGenres(genreNames: string[], genres: Genre[]): Genre[] {
    return genreNames.map((genre: string) => {
      return genres.find((g: Genre) => genre === g.id)!
    })
  }
}
