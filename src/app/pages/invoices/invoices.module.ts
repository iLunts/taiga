import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesCreateComponent } from './create/create.component';
import { InvoicesListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [InvoicesCreateComponent, InvoicesListComponent],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    SharedModule,
  ]
})
export class InvoicesModule { }
