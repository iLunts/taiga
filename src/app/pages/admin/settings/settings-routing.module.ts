import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'company',
        loadChildren: () =>
          import('./company/company.module').then((m) => m.CompanyModule)
      },
      {
        path: 'services',
        loadChildren: () =>
          import('./services/services.module').then((m) => m.ServicesModule)
      }
    ]
  }
  // {
  //   path: '',
  //   component: SettingsComponent
  // },
  // {
  //   path: 'company',
  //   loadChildren: () =>
  //     import('./company/company.module').then((m) => m.CompanyModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
