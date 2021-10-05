import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {BookCardComponent} from "./components/book-card/book-card.component";
import {BookListComponent} from "./components/book-list/book-list.component";
import {CreateBookFormComponent} from "./components/create-book-form/create-book-form.component";
import {NgSelectModule} from "@ng-select/ng-select";
import { HomeComponent } from './components/home/home.component';
import {RouterModule, Routes} from "@angular/router";
import {StopPropagationDirective} from "./directives/stop-propagation.directive";
import {RestrictedDirective} from "./directives/restricted.directive";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    BookCardComponent,
    BookListComponent,
    CreateBookFormComponent,
    HomeComponent,
    RestrictedDirective,
    StopPropagationDirective,
  ],
  imports: [
    NgSelectModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    NgSelectModule,
    SharedModule,
    RouterModule,
  ]
})
export class HomeModule {

}
