import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoicesCreateComponent } from './create/create.component';
import { InvoicesListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: InvoicesListComponent
  },
  {
    path: 'create',
    component: InvoicesCreateComponent,
    data: {
      contract: 'test data contract'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule {}
