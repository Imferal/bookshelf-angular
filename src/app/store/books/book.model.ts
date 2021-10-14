import {ID} from "@datorama/akita";

export interface Book {
  id: ID,
  name: string,
  year: number,
  author: string,
  description?: string,
  genreIds: Array<string>
}

export function createBook(params: Partial<Book>) {
  return {

  } as Partial<Book>
}
