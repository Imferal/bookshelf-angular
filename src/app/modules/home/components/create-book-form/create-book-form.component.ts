import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BooksService} from "../../../../store/books/books.service";
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {NgSelectConfig} from '@ng-select/ng-select';
import {GenresQuery} from "../../../../store/genres/genres.query";
import {Genre} from "../../../../store/genres/genre.model";

/** Отписка от стримов перед уничтожением компонента */
@UntilDestroy()
@Component({
  selector: 'app-create-book-form',
  templateUrl: './create-book-form.component.html',
  styleUrls: ['./create-book-form.component.scss']
})
export class CreateBookFormComponent implements OnInit {
  form!: FormGroup
  // genres!: Genre[]
  isFormVisible: boolean = false

  constructor(
    public books: BooksService,
    public genresQuery: GenresQuery,
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
    // this.genresQuery.genres$.pipe(untilDestroyed(this)).subscribe((genres: Genre[]) => {
    //   this.genres = genres
    // })
  }

  /** Добавление новой книги */
  submit() {
    this.genresQuery.selectMany(this.form.value.genres)
      .pipe(untilDestroyed(this))
      .subscribe((genres: Genre[]) => {
        /** Генерируем уникальный id и добавляем жанры */
        this.books.addBook({
          ...this.form.value,
          id: new Date().valueOf(),
          genreIds: this.form.controls.genres.value
        })
      })
  }

  showForm() {
    this.isFormVisible = !this.isFormVisible
  }
}
