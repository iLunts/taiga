import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TuiButtonModule, TuiHintControllerModule } from '@taiga-ui/core';
import { TuiTableModule } from '@taiga-ui/addon-table';

import { EmptyModule } from 'src/app/shared/components/empty/empty.module';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { ServicesCreateComponent } from './create/services-create.component';
import { ServicesListComponent } from './list/services-list.component';
import { ServicesRoutingModule } from './services-routing.module';
import {
  TuiFieldErrorModule,
  TuiFilterModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiTabsModule
} from '@taiga-ui/kit';
import { SharedModule } from 'src/app/shared/shared.module';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';

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
    TuiFieldErrorModule,
    TuiFilterModule,
    TuiHintControllerModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiTableModule,
    TuiTabsModule
  ]
})
export class ServicesModule {}
