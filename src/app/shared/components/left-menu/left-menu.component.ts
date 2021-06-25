import { Component, OnInit } from '@angular/core';
import { Menu, MenuType } from 'src/app/models/menu';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.less'],
})
export class LeftMenuComponent implements OnInit {
  user: User;
  menu: Menu[] = [
    {
      name: 'Домашняя',
      url: environment.routing.admin.dashboard,
      icon: 'tuiIconDesktopLarge',
      type: 'menu',
    },
    {
      name: 'Контрагенты',
      url: environment.routing.admin.contractor.list,
      icon: 'tuiIconFileLarge',
      type: 'menu',
    },
    {
      name: 'Услуги',
      url: environment.routing.admin.contractor.list,
      icon: 'tuiIconFileLarge',
      type: 'menu',
      disabled: true,
    },
    {
      name: 'Профиль',
      url: environment.routing.admin.contractor.list,
      icon: 'tuiIconFileLarge',
      type: 'menu',
      disabled: true,
    },
    {
      name: '',
      url: '',
      icon: '',
      type: 'divider',
    },
    {
      name: 'Счета',
      url: environment.routing.admin.invoice.list,
      icon: 'tuiIconFileLarge',
      type: 'menu',
    },
    {
      name: 'Договора',
      url: environment.routing.admin.contract.list,
      icon: 'tuiIconFileLarge',
      type: 'menu',
    },
    {
      name: 'Акты',
      url: environment.routing.admin.invoice.list,
      icon: 'tuiIconFileLarge',
      type: 'menu',
      disabled: true,
    },
    {
      name: '',
      url: '',
      icon: '',
      type: 'divider',
    },
    {
      name: 'Настройки',
      url: environment.routing.admin.settings.main,
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
