import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../services/book-state.service";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() book!: Book;

  constructor() {}

  ngOnInit(): void {
  }

}
