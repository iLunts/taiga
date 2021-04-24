import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LeftMenuModule } from './left-menu/left-menu.module';
import { CustomerModule } from './customer/customer.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    CustomerModule,
    LeftMenuModule,
  ],
  exports: [
    CustomerModule,
    LeftMenuModule,
  ]
})
export class ComponentsModule { }
