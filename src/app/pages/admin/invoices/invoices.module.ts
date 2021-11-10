import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractorModule } from 'src/app/shared/components/contractor/contractor.module';
import { InvoicesCreateComponent } from './create/create.component';
import { InvoicesListComponent } from './list/list.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  TuiAvatarModule,
  TuiBadgeModule,
  TuiInputDateRangeModule,
  TuiInputFileModule,
  TuiInputInlineModule,
  TuiInputNumberModule,
  TuiTabsModule,
  TuiTextAreaModule
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiFormatNumberPipeModule,
  TuiHintControllerModule,
  TuiHostedDropdownModule
} from '@taiga-ui/core';
import { TuiLetModule } from '@taiga-ui/cdk';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';

@NgModule({
  declarations: [InvoicesCreateComponent, InvoicesListComponent],
  imports: [
    CommonModule,
    ContractorModule,
    HeaderModule,
    InvoicesRoutingModule,
    SharedModule,
    TuiAvatarModule,
    TuiBadgeModule,
    TuiButtonModule,
    TuiCurrencyPipeModule,
    TuiFormatNumberPipeModule,
    TuiHintControllerModule,
    TuiHostedDropdownModule,
    TuiInputDateRangeModule,
    TuiInputFileModule,
    TuiInputInlineModule,
    TuiInputNumberModule,
    TuiLetModule,
    TuiTabsModule,
    TuiTextAreaModule
  ]
})
export class InvoicesModule {}
