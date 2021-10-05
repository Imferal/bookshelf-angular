import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthorizationComponent} from './shared/components/authorization/authorization.component';
import {BookDetailsModule} from "./modules/book-details/book-details.module";
import {HomeModule} from "./modules/home/home.module";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
  ],
  imports: [
    HomeModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BookDetailsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
