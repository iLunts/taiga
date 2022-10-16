import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BankModule } from './bank/bank.module';
import { CompanyModule } from './company/company.module';
import { ContractorModule } from './contractor/contractor.module';
import { EmptyModule } from './empty/empty.module';
import { InvoiceModule } from './invoice/invoice.module';
import { LeftMenuModule } from './left-menu/left-menu.module';
import { PagesModule } from '../pages/pages.module';
import { ServiceModule } from './service/service.module';
import { StatusModule } from './status/status.module';
import { UploaderModule } from './uploader/uploader.module';
import { UploadImageModule } from './upload-image/upload-image.module';

@NgModule({
  declarations: [],
  imports: [
    BankModule,
    CommonModule,
    CompanyModule,
    ContractorModule,
    EmptyModule,
    InvoiceModule,
    LeftMenuModule,
    PagesModule,
    RouterModule,
    ServiceModule,
    StatusModule,
    UploaderModule,
    UploadImageModule
  ],
  exports: [
    BankModule,
    CompanyModule,
    ContractorModule,
    EmptyModule,
    InvoiceModule,
    LeftMenuModule,
    PagesModule,
    RouterModule,
    ServiceModule,
    StatusModule,
    UploaderModule,
    UploadImageModule
  ]
})
export class ComponentsModule {}
