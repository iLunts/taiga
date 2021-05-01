import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LeftMenuModule } from './left-menu/left-menu.module';
import { ContractorModule } from './contractor/contractor.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ServiceModule } from './service/service.module';
import { StatusModule } from './status/status.module';
import { UploadImageModule } from './upload-image/upload-image.module';
import { CompanyModule } from './company/company.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CompanyModule,
    ContractorModule,
    InvoiceModule,
    LeftMenuModule,
    RouterModule,
    ServiceModule,
    StatusModule,
    UploadImageModule,
  ],
  exports: [
    CompanyModule,
    ContractorModule,
    InvoiceModule,
    LeftMenuModule,
    RouterModule,
    ServiceModule,
    StatusModule,
    UploadImageModule,
  ]
})
export class ComponentsModule { }
