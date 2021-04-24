import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractorModule } from 'src/app/shared/components/contractor/contractor.module';
import { InvoicesCreateComponent } from './create/create.component';
import { InvoicesListComponent } from './list/list.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    InvoicesCreateComponent,
    InvoicesListComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    SharedModule,
    ContractorModule,
  ]
})
export class InvoicesModule { }
