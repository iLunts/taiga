import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHintControllerModule,
  TuiHostedDropdownModule,
  TuiLoaderModule
} from '@taiga-ui/core';
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
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiEditorModule } from '@taiga-ui/addon-editor';

import { ContractCreateComponent } from './create/create.component';
import { ContractListComponent } from './list/list.component';
import { ContractRoutingModule } from './contract-routing.module';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ContractCreateComponent, ContractListComponent],
  imports: [
    CommonModule,
    ContractRoutingModule,
    HeaderModule,
    SharedModule,
    TuiAvatarModule,
    TuiBadgeModule,
    TuiButtonModule,
    TuiDataListModule,
    TuiEditorModule,
    TuiHintControllerModule,
    TuiHostedDropdownModule,
    TuiInputDateModule,
    TuiInputDateRangeModule,
    TuiInputFileModule,
    TuiInputInlineModule,
    TuiInputNumberModule,
    TuiLetModule,
    TuiLoaderModule,
    TuiTabsModule,
    TuiTextAreaModule
  ]
})
export class ContractModule {}
