import { Injectable } from '@angular/core';
import {StateService} from "../store/state";
import {Observable} from "rxjs";

export type Genres = 'Роман' | 'Исторический жанр' | 'Эпос' | 'Поэзия' | 'Эпопея'

export interface Book {
  id: number,
  name: string,
  author: string,
  description?: string,
  year: number,
  genres: Genres[],
}

interface BooksState {
  books: Book[]
}

const initialState: BooksState = {
  books: [{
    id: 1,
    name: 'Тихий Дон',
    author: 'Михаил Шолохов',
    description: '«Ти́хий Дон» — роман-эпопея в четырёх томах, написанный Михаилом Шолоховым. Тома 1—3 написаны с 1925 по 1932 год, опубликованы в журнале «Октябрь» в 1928—1932 гг. Том 4 закончен в 1940 году, опубликован в журнале «Новый мир» в 1937—1940 году.',
    year: 1940,
    genres: ['Роман', 'Исторический жанр']
  },{
    id: 2,
    name: 'Ведьмак',
    author: 'Анджей Сапковский',
    description: '«Сага о ведьмаке» (польск. Saga o wiedźminie) — цикл книг польского писателя Анджея Сапковского в жанре фэнтези.',
    year: 1986,
    genres: ['Эпос', 'Поэзия', 'Эпопея']
  },{
    id: 3,
    name: 'Илиада',
    author: 'Гомер',
    description: '«Илиа́да» (др.-греч. Ἰλιάς) — древнейший из сохранившихся памятников древнегреческой литературы, эпическая поэма, приписываемая Гомеру.',
    year: -700,
    genres: ['Эпос', 'Поэзия', 'Эпопея']
  },{
    id: 4,
    name: 'Одиссея',
    author: 'Гомер',
    description: '«Одиссе́я» — вторая после «Илиады» классическая поэма, приписываемая древнегреческому поэту Гомеру. Создана в VIII веке до н. э. или несколько позже.',
    year: -700,
    genres: ['Эпос', 'Поэзия', 'Эпопея']
  },]
}

@Injectable({
  providedIn: 'root'
})
export class BookStateService extends StateService<BooksState>{
  books$: Observable<Book[]> = this.select(state => state.books)

  constructor() {
    super(initialState)
  }

  /** Добавляем книгу в state */
  addBook(book: Book) {
    this.setState({books: [...this.state.books, book]})
    console.log('Добавлено: ', this.state.books)
  }

  /** Удаляем книгу из state */
  removeBook(id: number) {
    this.setState({
      books: [...this.state.books.filter(book => book.id !== id)]
    })
    console.log('Удалено: ', this.state.books)
  }
}
