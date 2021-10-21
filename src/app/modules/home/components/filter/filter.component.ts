import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {GenresQuery} from "../../../../store/genres/genres.query";
import {NgSelectConfig} from "@ng-select/ng-select";
import {BooksService} from "../../../../store/books/books.service";
import {untilDestroyed} from "@ngneat/until-destroy";
import {BooksFilterService} from "../../../../shared/services/books-filter.service";
import {searchFilter} from "akita-filters-plugin";

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
    this.form.controls.author.valueChanges.pipe(untilDestroyed(this)).subscribe((author: string) => {
      if (author) {
        this.booksFilter.setFilter({
          id: 'author',
          value: author,
          predicate: entity => searchFilter(author, entity)
        })
      } else {
        this.booksFilter.removeFilter('author')
      }
    })

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
