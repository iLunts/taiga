import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHintControllerModule,
  TuiHostedDropdownModule,
  TuiLinkModule
} from '@taiga-ui/core';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiCheckboxLabeledModule,
  TuiDataListWrapperModule,
  TuiFieldErrorModule,
  TuiFilterModule,
  TuiInputCountModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiSelectModule,
  TuiTabsModule,
  TuiTextAreaModule
} from '@taiga-ui/kit';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';

import { EmptyModule } from 'src/app/shared/components/empty/empty.module';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { ServicesCreateComponent } from './create/services-create.component';
import { ServicesListComponent } from './list/services-list.component';
import { ServicesRoutingModule } from './services-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ServicesListComponent, ServicesCreateComponent],
  imports: [
    CommonModule,
    EmptyModule,
    FormsModule,
    HeaderModule,
    ReactiveFormsModule,
    ServicesRoutingModule,
    SharedModule,
    TuiButtonModule,
    TuiCurrencyPipeModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiFieldErrorModule,
    TuiFilterModule,
    TuiHintControllerModule,
    TuiHostedDropdownModule,
    TuiInputCountModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiLinkModule,
    TuiSelectModule,
    TuiTableModule,
    TuiTabsModule,
    TuiTextAreaModule,
    TuiCheckboxLabeledModule
  ]
})
export class ServicesModule {}
