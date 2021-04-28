import { Component, OnInit } from '@angular/core';
import { Menu, MenuType } from 'src/app/models/menu';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.less'],
})
export class LeftMenuComponent implements OnInit {
  user: User;
  menu: Menu[] = [
    {
      name: 'Главная',
      url: 'home',
      icon: 'tuiIconDesktopLarge',
      type: 'menu',
    },
    {
      name: 'Счета',
      url: 'invoices',
      icon: 'tuiIconFileLarge',
      type: 'menu',
    },
    {
      name: '',
      url: '',
      icon: '',
      type: 'divider',
    },
    {
      name: 'Настройки',
      url: 'settings',
      icon: 'tuiIconSettingsLarge',
      type: 'menu',
    },
  ];
  MENU_TYPE: MenuType;

  constructor(private _auth: AuthService) {}

  ngOnInit(): void {
    this.user = this._auth.getUser();
  }

  get getUserDisplayName(): string {
    return this._auth.getUserDisplayName();
  }
}
