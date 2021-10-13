import {Component} from '@angular/core';
import {UntilDestroy} from "@ngneat/until-destroy";

/** Отписка от стримов перед уничтожением компонента */
@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
}
