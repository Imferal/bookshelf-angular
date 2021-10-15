import {ID} from "@datorama/akita";
import { Genre } from "../genres/genre.model";

export interface Book {
  id: ID,
  name: string,
  year: number,
  author: string,
  description?: string,
  genres?: Genre[],
  genreIds: Array<string>,
}

export function createBook(params: Partial<Book>) {
  return {

  } as Partial<Book>
}
