import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LeftMenuModule } from './left-menu/left-menu.module';
import { ContractorModule } from './contractor/contractor.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ServiceModule } from './service/service.module';
import { StatusModule } from './status/status.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ContractorModule,
    InvoiceModule,
    LeftMenuModule,
    RouterModule,
    ServiceModule,
    StatusModule,
  ],
  exports: [
    ContractorModule,
    InvoiceModule,
    LeftMenuModule,
    RouterModule,
    ServiceModule,
    StatusModule,
  ]
})
export class ComponentsModule { }
