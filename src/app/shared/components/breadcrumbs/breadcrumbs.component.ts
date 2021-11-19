import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent implements OnInit {
  items = [
    {
      caption: 'Selects',
      routerLink: '/components/select'
    },
    {
      caption: 'Multi',
      routerLink: '/components/multi-select'
    },
    {
      caption: 'With tags',
      routerLink: '/components/multi-select'
    },
    {
      caption: 'Current',
      routerLink: '/navigation/breadcrumbs',
      routerLinkActiveOptions: { exact: true }
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
