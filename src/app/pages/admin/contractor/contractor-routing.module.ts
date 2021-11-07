import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractorAsideLayoutComponent } from 'src/app/layouts/contractor-aside-layout/contractor-aside-layout.component';
import { ContractorBaseComponent } from './base/base.component';
import { ContractorCreateComponent } from './create/create.component';
import { ContractorListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ContractorAsideLayoutComponent,
    children: [
      {
        path: '',
        component: ContractorBaseComponent,
        children: [
          {
            path: 'list',
            component: ContractorListComponent
          },
          {
            path: 'create',
            component: ContractorCreateComponent
          }
        ]
      }
    ]
  }
  // {
  //   path: '',
  //   component: ContractorBaseComponent,
  //   children: [
  //     {
  //       path: 'list',
  //       component: ContractorListComponent
  //     },
  //     {
  //       path: 'create',
  //       component: ContractorCreateComponent
  //     }
  //   ]
  // }
  // {
  //   path: '',
  //   redirectTo: environment.routing.admin.contractor.list,
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractorRoutingModule {}
