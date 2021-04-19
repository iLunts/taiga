import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.less']
})
export class LeftMenuComponent implements OnInit {
  user: User;

  constructor(
    private _auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.user = this._auth.getUser();
  }

  get getUserDisplayName(): string {
    return this._auth.getUserDisplayName();
  }
}
