import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {
  routing = environment.routing;
  menuList = [
    {
      label: 'Компании',
      url: this.routing.admin.settings.company,
      icon: ''
    },
    {
      label: 'Сотрудники',
      url: this.routing.admin.settings.company,
      icon: ''
    },
    {
      label: 'Мобильные приложения',
      url: this.routing.admin.settings.company,
      icon: ''
    },
    {
      label: 'Шаблоны',
      url: this.routing.admin.settings.company,
      icon: ''
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
