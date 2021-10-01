export type Genre = {id: string, value: string}

export interface Book {
  id: number,
  name: string,
  year: number,
  author: string,
  description?: string,
  genres: Genre[],
}

export interface BooksState {
  genres: Genre[]
  books: Book[]
}
