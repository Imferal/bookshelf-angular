import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {GenresQuery} from "../../../../store/genres/genres.query";
import {NgSelectConfig} from "@ng-select/ng-select";
import {BooksService} from "../../../../store/books/books.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {BooksFilterService} from "../../../../shared/services/books-filter.service";
import {searchFilter} from "akita-filters-plugin";

@UntilDestroy()
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  form!: FormGroup
  isFormVisible: boolean = false

  constructor(
    public booksService: BooksService,
    private booksFilter: BooksFilterService,
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

    /** Фильтрация по автору */
    this.form.controls.author.valueChanges.pipe(untilDestroyed(this)).subscribe((author: string) => {
      if (author) {
        this.booksFilter.setFilter({
          id: 'author',
          value: author,
          predicate: entity => entity.author.toLocaleLowerCase().includes(author.toLocaleLowerCase())
        })
      } else {
        this.booksFilter.removeFilter('author')
      }
    })

    /** Фильтрация по вхождению */
    this.form.controls.text.valueChanges.pipe(untilDestroyed(this)).subscribe((text: string) => {
      if (text) {
        this.booksFilter.setFilter({
          id: 'text',
          value: text,
          predicate: entity => entity.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()) || (entity.description?.toLocaleLowerCase().includes(text.toLocaleLowerCase()) || false)
        })
      } else {
        this.booksFilter.removeFilter('text')
      }
    })

    /** Фильтрация по году от */
    this.form.controls.yearFrom.valueChanges.pipe(untilDestroyed(this)).subscribe((yearFrom: string) => {
      if (yearFrom) {
        this.booksFilter.setFilter({
          id: 'yearFrom',
          value: yearFrom,
          predicate: entity => entity.year >= +yearFrom
        })
      } else {
        this.booksFilter.removeFilter('yearFrom')
      }
    })

    /** Фильтрация по году до */
    this.form.controls.yearTo.valueChanges.pipe(untilDestroyed(this)).subscribe((yearTo: string) => {
      if (yearTo) {
        this.booksFilter.setFilter({
          id: 'yearTo',
          value: yearTo,
          predicate: entity => entity.year <= +yearTo
        })
      } else {
        this.booksFilter.removeFilter('yearTo')
      }
    })

    /** Фильтрация по жанру */
    this.form.controls.genreIds.valueChanges.pipe(untilDestroyed(this)).subscribe((genreIds: string[]) => {
      if (genreIds) {
        this.booksFilter.setFilter({
          id: 'genreIds',
          value: genreIds,
          predicate: entity => genreIds!.every(genreId => entity.genreIds.includes(genreId))
        })
      } else {
        this.booksFilter.removeFilter('genreIds')
      }
    })

  }

  showForm() {
    this.isFormVisible = !this.isFormVisible
  }
}
