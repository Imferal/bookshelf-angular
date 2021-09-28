import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BookStateService} from "../../services/book-state.service";

@Component({
  selector: 'app-create-book-form',
  templateUrl: './create-book-form.component.html',
  styleUrls: ['./create-book-form.component.scss']
})
export class CreateBookFormComponent implements OnInit {
  form!: FormGroup

  constructor(
    private bookStateService: BookStateService,
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      genre: new FormControl('prose'),
      description: new FormControl(null),
    })
  }

  submit() {
    /**  */
    const formData = {...this.form.value, id: new Date().valueOf()}
    console.log('Form data: ', formData)
    this.bookStateService.addBook(formData)
  }
}
