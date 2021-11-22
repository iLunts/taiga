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
      label: 'Компания',
      url: this.routing.admin.settings.company,
      icon: ''
    },
    {
      label: 'Сотрудники',
      url: this.routing.admin.settings.employees,
      icon: ''
    },
    {
      label: 'Мобильные приложения',
      url: this.routing.admin.settings.apps,
      icon: ''
    },
    {
      label: 'Шаблоны',
      url: this.routing.admin.settings.templates,
      icon: ''
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
