import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {CardComponent} from "./components/book-card/card.component";
import {ListComponent} from "./components/book-list/list.component";
import {CreateBookFormComponent} from "./components/create-book-form/create-book-form.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {RouterModule, Routes} from "@angular/router";
import {StopPropagationDirective} from "./directives/stop-propagation.directive";
import {RestrictedDirective} from "./directives/restricted.directive";
import { HomeComponent } from "./components/home/home.component";
import {FilterComponent} from "./components/filter/filter.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    FilterComponent,
    CardComponent,
    ListComponent,
    CreateBookFormComponent,
    HomeComponent,
    RestrictedDirective,
    StopPropagationDirective,
  ],
  imports: [
    NgSelectModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    NgSelectModule,
    SharedModule,
    RouterModule,
  ]
})
export class HomeModule {

}
