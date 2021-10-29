import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHintControllerModule,
  TuiHostedDropdownModule,
} from '@taiga-ui/core';
import {
  TuiAvatarModule,
  TuiInputDateModule,
  TuiInputDateRangeModule,
  TuiInputFileModule,
  TuiInputInlineModule,
  TuiInputNumberModule,
  TuiTabsModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiEditorModule } from '@taiga-ui/addon-editor';

import { ContractCreateComponent } from './create/create.component';
import { ContractListComponent } from './list/list.component';
import { ContractRoutingModule } from './contract-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderModule } from 'src/app/shared/components/header/header.module';

@NgModule({
  declarations: [ContractListComponent, ContractCreateComponent],
  imports: [
    CommonModule,
    ContractRoutingModule,
    SharedModule,
    HeaderModule,
    TuiAvatarModule,
    TuiButtonModule,
    TuiDataListModule,
    TuiHintControllerModule,
    TuiHostedDropdownModule,
    TuiInputDateModule,
    TuiInputDateRangeModule,
    TuiInputFileModule,
    TuiInputInlineModule,
    TuiInputNumberModule,
    TuiLetModule,
    TuiTabsModule,
    TuiTextAreaModule,
    TuiEditorModule,
  ],
})
export class ContractModule {}
