import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BookStateService} from "../../services/book-state.service";
import {Genre} from "../../models/BookState";
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import { NgSelectConfig } from '@ng-select/ng-select';

/** Отписка от стримов перед уничтожением компонента */
@UntilDestroy()
@Component({
  selector: 'app-create-book-form',
  templateUrl: './create-book-form.component.html',
  styleUrls: ['./create-book-form.component.scss']
})
export class CreateBookFormComponent implements OnInit {
  form!: FormGroup
  genres!: Genre[]

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

  }

  /** Добавление новой книги */
  submit() {
    /** Подготавливаем массив с жанрами */
    this.form.value.genres = this.form.value.genres.map((genre: String) => {
      return this.genres.find(g => genre === g.value)
    })
    /** Генерируем уникальный id */
    const formData = {...this.form.value, id: new Date().valueOf()}

    console.log(formData)
    this.bookState.addBook(formData)
  }
}
