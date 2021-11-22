import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractorCreateComponent } from './create/create.component';
import { ContractorListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ContractorListComponent
  },
  {
    path: 'create',
    component: ContractorCreateComponent
  }
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
