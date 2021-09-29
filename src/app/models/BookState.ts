export type Genre = {id: string, value: string}

export interface Book {
  id: number,
  name: string,
  author: string,
  description?: string,
  year: number,
  genres: Genre[],
}

export interface BooksState {
  genres: Genre[]
  books: Book[]
}
