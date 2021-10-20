import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {NgSelectConfig} from "@ng-select/ng-select";
import {AuthService} from 'src/app/store/auth/auth.service';
import {ActivatedRoute, Router} from "@angular/router";
import {GenresQuery} from "../../../../store/genres/genres.query";
import {AuthQuery} from "../../../../store/auth/auth.query";
import {Book} from "../../../../store/books/book.model";
import {Genre} from 'src/app/store/genres/genre.model';

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
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() book!: Book;
  @Output() edit = new EventEmitter<Book>()
  @Output() delete = new EventEmitter<number>()

  authError: boolean = false
  form!: FormGroup
  bookGenres!: string[]
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
    public genresQuery: GenresQuery,
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
    this.genresQuery.selectMany(this.book.genreIds, ({id}) => id)
      .pipe(untilDestroyed(this))
      .subscribe((genres: string[]) => {
        this.selectedGenres = genres
      })
    /** Формируем список выбранных жанров для режима просмотра */
    this.genresQuery.selectMany(this.book.genreIds, ({value}) => value)
      .pipe(untilDestroyed(this))
      .subscribe((genres: string[]) => {
        this.bookGenres = genres
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
    /** Добавляем id и эмитим */
    this.edit.emit(({
      id: this.book.id,
      name: this.form.value.name,
      author: this.form.value.author,
      year: this.form.value.year,
      description: this.form.value.description,
      genreIds: this.form.value.genres,
    }))
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
