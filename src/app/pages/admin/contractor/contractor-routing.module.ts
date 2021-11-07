import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ContractorBaseComponent } from './base/base.component';

import { ContractorCreateComponent } from './create/create.component';
import { ContractorListComponent } from './list/list.component';

const routes: Routes = [
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
