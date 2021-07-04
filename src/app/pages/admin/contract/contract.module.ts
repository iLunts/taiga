import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiButtonModule, TuiHintControllerModule } from '@taiga-ui/core';
import {
  TuiInputDateModule,
  TuiInputDateRangeModule,
  TuiInputNumberModule,
} from '@taiga-ui/kit';

import { ContractCreateComponent } from './create/create.component';
import { ContractListComponent } from './list/list.component';
import { ContractRoutingModule } from './contract-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ContractListComponent, ContractCreateComponent],
  imports: [
    CommonModule,
    ContractRoutingModule,
    SharedModule,
    TuiButtonModule,
    TuiHintControllerModule,
    TuiInputDateRangeModule,
    TuiInputNumberModule,
    TuiInputDateModule,
  ],
})
export class ContractModule {}
