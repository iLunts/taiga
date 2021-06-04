import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultLayoutComponent } from 'src/app/layouts/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
