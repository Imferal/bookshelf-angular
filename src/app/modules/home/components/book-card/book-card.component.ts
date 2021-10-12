import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {BooksService} from "../../../../store/books/books.service";
import {NgSelectConfig} from "@ng-select/ng-select";
import {Utils} from "../../../../../utils";
import {AuthService} from 'src/app/store/auth/auth.service';
import {ActivatedRoute, Router} from "@angular/router";
import {GenresQuery} from "../../../../store/genres/genres.query";
import {AuthQuery} from "../../../../store/auth/auth.query";
import {Book} from "../../../../store/books/book.model";
import { Genre } from 'src/app/store/genres/genre.model';

/** Отписка от стримов перед уничтожением компонента */
@UntilDestroy()
@Component({
  selector: 'app-book-card',
  animations: [
    trigger('show', [
      transition('void => *', [
        style({
          opacity: 0,
          transform: `translate({{randomXShow}},{{randomYShow}}) scale(2) rotate({{randomDegShow}})`,
        }),
        animate('0.4s', style({
          opacity: 1,
          transform: 'initial',
        })),
      ]),
      transition('* => void', [
        animate('0.8s', style({
          opacity: 0,
          transform: `translate({{randomXRemove}},{{randomYRemove}}) scale(0.2) rotate({{randomDegRemove}})`,
        })),
      ]),
    ]),
  ],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() book!: Book;
  @Output() edit = new EventEmitter<Book>()
  @Output() delete = new EventEmitter<number>()

  authError: boolean = false
  form!: FormGroup
  genres!: Genre[]
  selectedGenres!: string[]
  isEdit: boolean = false
  isVisible!: boolean
  randomDegShow!: string
  randomDegRemove!: string
  randomXShow!: string
  randomXRemove!: string
  randomYShow!: string
  randomYRemove!: string

  constructor(
    public bookState: BooksService,
    private genresQuery: GenresQuery,
    private auth: AuthService,
    private authQuery: AuthQuery,
    private router: Router,
    private route: ActivatedRoute,
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
    this.isVisible = true
    this.randomDegShow = Math.random() * 180 - 90 + 'deg'
    this.randomDegRemove = Math.random() * 720 - 360 + 'deg'
    this.randomXShow = Math.random() * 700 - 250 + 'px'
    this.randomXRemove = Math.random() * 700 - 250 + 'px'
    this.randomYShow = Math.random() * 400 - 200 + 'px'
    this.randomYRemove = Math.random() * 400 - 200 + 'px'
    /** Формируем список выбранных жанров для режима редактирования */
    this.selectedGenres = this.book.genres.map((genre: Genre): string => genre.id)
    /** Подписка на литературные жанры */
    this.genresQuery.genres$.pipe(untilDestroyed(this)).subscribe((genres$: Genre[]) => {
      this.genres = genres$
    })

  }

  removeBook() {
    this.isVisible = false
    setTimeout(() => {
      this.delete.emit(+this.book.id)
    }, 800)
  }

  /** Изменение существующей книги */
  editBook() {
    /** Подготавливаем массив с жанрами */
    const genres = Utils.setBookGenres(this.form.value.genres, this.genres)
    /** Добавляем id и эмитим */
    this.edit.emit({...this.form.value, id: this.book.id, genres})
  }

  showDetails() {
    this.authQuery.isAuth$.subscribe((isAuth: boolean) => {
        if (isAuth) {
          this.router.navigate(['/book/' + this.book.id])
        } else {
          this.authError = true
        }
      }
    )
  }
}
