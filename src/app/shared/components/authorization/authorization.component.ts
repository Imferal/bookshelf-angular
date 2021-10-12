import {Component, OnInit} from '@angular/core';
import {UntilDestroy} from "@ngneat/until-destroy";
import {AuthService} from "../../../store/auth/auth.service";
import {AuthQuery} from "../../../store/auth/auth.query";

/** Отписка от стримов перед уничтожением компонента */
@UntilDestroy()
@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent {
  isAuth!: boolean
  restricted!: boolean

  constructor(
    public auth: AuthService,
    public authQuery: AuthQuery,
  ) {
  }
}
