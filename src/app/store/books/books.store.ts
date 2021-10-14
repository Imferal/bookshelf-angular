import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {Injectable} from "@angular/core";
import {Book} from "./book.model";

export interface BooksState extends EntityState<Book> {
}

const booksInitialState = [
  {
    id: 1,
    name: 'Тихий Дон',
    author: 'Михаил Шолохов',
    description: '«Ти́хий Дон» — роман-эпопея в четырёх томах, написанный Михаилом Шолоховым. Тома 1—3 написаны с 1925 по 1932 год, опубликованы в журнале «Октябрь» в 1928—1932 гг. Том 4 закончен в 1940 году, опубликован в журнале «Новый мир» в 1937—1940 году.',
    year: 1940,
    genreIds: ['Novel', 'Epic', 'Historical']
  },
  {
    id: 2,
    name: 'Ведьмак',
    author: 'Анджей Сапковский',
    description: '«Сага о ведьмаке» (польск. Saga o wiedźminie) — цикл книг польского писателя Анджея Сапковского в жанре фэнтези.',
    year: 1986,
    genreIds: ['Fantasy']
  },
  {
    id: 3,
    name: 'Илиада',
    author: 'Гомер',
    description: '«Илиа́да» (др.-греч. Ἰλιάς) — древнейший из сохранившихся памятников древнегреческой литературы, эпическая поэма, приписываемая Гомеру.',
    year: -700,
    genreIds: ['Epos', 'Poetry', 'Epic']
  },
  {
    id: 4,
    name: 'Одиссея',
    author: 'Гомер',
    description: '«Одиссе́я» — вторая после «Илиады» классическая поэма, приписываемая древнегреческому поэту Гомеру. Создана в VIII веке до н. э. или несколько позже.',
    year: -700,
    genreIds: ['Epos', 'Poetry', 'Epic']
  },
]

@Injectable({providedIn: 'root'})
@StoreConfig({
  name: 'books'
})
export class BooksStore extends EntityStore<BooksState> {
  constructor() {
    super();
    this.set(booksInitialState)
  }
}
