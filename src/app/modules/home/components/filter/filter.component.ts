import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {GenresQuery} from "../../../../store/genres/genres.query";
import {NgSelectConfig} from "@ng-select/ng-select";
import {BooksService} from "../../../../store/books/books.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  form!: FormGroup
  isFormVisible: boolean = false

  constructor(
    public booksService: BooksService,
    public genresQuery: GenresQuery,
    private config: NgSelectConfig,
  ) {
    this.config.notFoundText = 'Жанр не найден...';
    this.config.typeToSearchText = 'Начните вводить название жанра';
  }

  ngOnInit(): void {
    /** Инициализация формы добавления новой книги */
    this.form = new FormGroup({
      author: new FormControl(null),
      text: new FormControl(null),
      yearFrom: new FormControl(null),
      yearTo: new FormControl(null),
      genreIds: new FormControl(null),
    })
  }

  showForm() {
    this.isFormVisible = !this.isFormVisible
  }
}
