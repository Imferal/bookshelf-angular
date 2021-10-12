import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {Injectable} from "@angular/core";
import {Genre} from "./genre.model";

export interface GenresState extends EntityState<Genre> {
}

const initialState = {
  genres: [
    {id: 'Novel', value: 'Роман'},
    {id: 'Historical', value: 'Исторический жанр'},
    {id: 'Epos', value: 'Эпос'},
    {id: 'Epic', value: 'Эпопея'},
    {id: 'Fantasy', value: 'Фэнтези'},
    {id: 'Poetry', value: 'Поэзия'},
  ]
}

@Injectable({providedIn: 'root'})
@StoreConfig({
  name: 'genres'
})
export class GenresStore extends EntityStore<GenresState> {
  constructor() {
    super(initialState);
  }
}
