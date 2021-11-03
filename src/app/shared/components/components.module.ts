import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BankModule } from './bank/bank.module';
import { CompanyModule } from './company/company.module';
import { ContractorModule } from './contractor/contractor.module';
import { InvoiceModule } from './invoice/invoice.module';
import { LeftMenuModule } from './left-menu/left-menu.module';
import { ServiceModule } from './service/service.module';
import { StatusModule } from './status/status.module';
import { UploadImageModule } from './upload-image/upload-image.module';
import { UploaderModule } from './uploader/uploader.module';

@NgModule({
  declarations: [],
  imports: [
    BankModule,
    CommonModule,
    CompanyModule,
    ContractorModule,
    InvoiceModule,
    LeftMenuModule,
    RouterModule,
    ServiceModule,
    StatusModule,
    UploadImageModule,
    UploaderModule
  ],
  exports: [
    BankModule,
    CompanyModule,
    ContractorModule,
    InvoiceModule,
    LeftMenuModule,
    RouterModule,
    ServiceModule,
    StatusModule,
    UploadImageModule,
    UploaderModule
  ]
})
export class ComponentsModule {}
