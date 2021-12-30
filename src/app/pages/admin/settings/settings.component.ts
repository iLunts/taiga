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
      label: 'Товары',
      url: this.routing.admin.settings.services.list,
      icon: ''
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
