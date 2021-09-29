import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {Book, Genre} from "../../models/BookState";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {BookStateService} from "../../services/book-state.service";
import {NgSelectConfig} from "@ng-select/ng-select";

/** Отписка от стримов перед уничтожением компонента */
@UntilDestroy()
@Component({
  selector: 'app-book-card',
  animations: [
    trigger('show', [
      transition('void => *', [
        style({
          opacity: 0,
          transform: `translate(-350px,200px) scale(2) rotate(${Math.random() * 180 - 90}deg)`,
        }),
        animate('0.4s', style({
          opacity: 1,
          transform: 'initial',
        })),
      ]),
      transition('* => void', [
        animate('0.8s', style({
          opacity: 0,
          transform: `translate(350px,-200px) scale(0.2) rotate(${Math.random() * 180 - 90 * 4}deg)`,
        })),
      ]),
    ]),
  ],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() book!: Book;
  @Output() delete = new EventEmitter<number>()

  form!: FormGroup
  genres!: Genre[]
  selectedGenres!: string[]
  isEdit: boolean = true
  isVisible!: boolean

  constructor(
    private bookState: BookStateService,
    private config: NgSelectConfig,
  ) {
    this.config.notFoundText = 'Жанр не найден...';
    this.config.typeToSearchText = 'Начните вводить название жанра';
  }

  ngOnInit(): void {
    /** Инициализация формы добавления новой книги */
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      genres: new FormControl(null, Validators.required),
      description: new FormControl(null),
    })
    /** Подписка на литературные жанры */
    this.bookState.genres$.pipe(untilDestroyed(this)).subscribe((genres$: Genre[]) => {
      this.genres = genres$
    })
    this.isVisible = true
    /** Формируем список выбранных жанров для режима редактирования */
    this.selectedGenres = this.book.genres.map((genre: Genre): string => genre.id)
  }

  removeBook() {
    this.isVisible = false
    setTimeout(() => {
      this.delete.emit(this.book.id)
    }, 800)
  }

  /** Изменение существующей книги */
  submit() {
    /** Подготавливаем массив с жанрами */
    this.form.value.genres = this.form.value.genres.map((genre: String) => {
      let i = this.genres.find(g => {
        return genre === g.id
      })
      return i
    })
    const formData = {...this.form.value, id: this.book.id}
    this.bookState.editBook(formData)
  }
}
