import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateBookFormComponent } from './components/create-book-form/create-book-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BookCardComponent } from './components/book-card/book-card.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateBookFormComponent,
    BookCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
