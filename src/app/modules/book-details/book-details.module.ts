import {NgModule} from "@angular/core";
import {BookDetailsComponent} from "./book-details.component";
import {SharedModule} from "../../shared/shared.module";
import {Routes} from "@angular/router";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../../auth.guard";

const routes: Routes = [
  {
    path: '',
    component: BookDetailsComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  declarations: [
    BookDetailsComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BookDetailsModule {

}
