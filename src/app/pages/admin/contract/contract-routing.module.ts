import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractCreateComponent } from './create/create.component';
import { ContractListComponent } from './list/list.component';
import { ContractorAsideLayoutComponent } from 'src/app/layouts/contractor-aside-layout/contractor-aside-layout.component';
import { ContractBaseComponent } from './base/base.component';

const routes: Routes = [
  {
    path: '',
    component: ContractorAsideLayoutComponent,
    children: [
      {
        path: '',
        component: ContractBaseComponent,
        children: [
          {
            path: 'list',
            component: ContractListComponent
          },
          {
            path: 'create',
            component: ContractCreateComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule {}
