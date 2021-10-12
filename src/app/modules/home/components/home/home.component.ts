import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../store/auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    public auth: AuthService,
  ) { }

}
