import { TuiErrorModule } from "@taiga-ui/core";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServicesCreateComponent } from './create/services-create.component';
import { ServicesListComponent } from './list/services-list.component';

const routes: Routes = [
  {
    path: '',
    component: ServicesListComponent
  },
  {
    path: 'create',
    component: ServicesCreateComponent
  },
  {
    path: 'edit/:id',
    component: ServicesCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TuiErrorModule],
  exports: [RouterModule]
})
export class ServicesRoutingModule {}
