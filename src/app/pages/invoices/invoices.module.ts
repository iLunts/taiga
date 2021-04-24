import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesCreateComponent } from './create/create.component';
import { InvoicesListComponent } from './list/list.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerModule } from 'src/app/shared/components/customer/customer.module';

@NgModule({
  declarations: [
    InvoicesCreateComponent,
    InvoicesListComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    SharedModule,
    CustomerModule
  ]
})
export class InvoicesModule { }
