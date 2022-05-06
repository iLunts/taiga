import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActRoutingModule } from './act-routing.module';
import { ActCreateComponent } from './create/create.component';
import { ActListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  TuiButtonModule,
  TuiFormatNumberPipeModule,
  TuiHintControllerModule,
  TuiHostedDropdownModule,
  TuiScrollbarModule
} from '@taiga-ui/core';
import { TuiLetModule } from '@taiga-ui/cdk';
import {
  TuiAvatarModule,
  TuiBadgeModule,
  TuiInputDateModule,
  TuiInputDateRangeModule,
  TuiInputFileModule,
  TuiInputInlineModule,
  TuiInputNumberModule,
  TuiTabsModule,
  TuiTextAreaModule
} from '@taiga-ui/kit';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { ContractorModule } from 'src/app/shared/components/contractor/contractor.module';
import { ContractModule } from 'src/app/shared/components/contract/contract.module';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';

@NgModule({
  declarations: [ActCreateComponent, ActListComponent],
  imports: [
    ActRoutingModule,
    CommonModule,
    ContractModule,
    ContractorModule,
    HeaderModule,
    SharedModule,
    TuiAvatarModule,
    TuiBadgeModule,
    TuiButtonModule,
    TuiCurrencyPipeModule,
    TuiFormatNumberPipeModule,
    TuiHintControllerModule,
    TuiHostedDropdownModule,
    TuiInputDateModule,
    TuiInputDateRangeModule,
    TuiInputFileModule,
    TuiInputInlineModule,
    TuiInputNumberModule,
    TuiLetModule,
    TuiScrollbarModule,
    TuiTabsModule,
    TuiTextAreaModule
  ],
  exports: [ActCreateComponent, ActListComponent]
})
export class ActModule {}
