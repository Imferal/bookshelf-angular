import {QueryEntity} from "@datorama/akita";
import {GenresState, GenresStore} from "./genres.store";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Genre} from "./genre.model";

@Injectable({providedIn: 'root'})
export class GenresQuery extends QueryEntity<GenresState> {
  genres$: Observable<Genre[]> = this.selectAll()

  constructor(protected store: GenresStore) {
    super(store);
  }
}
