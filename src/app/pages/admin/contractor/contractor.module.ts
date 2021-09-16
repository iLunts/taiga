import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {
  TuiAvatarModule,
  TuiCheckboxBlockModule,
  TuiFieldErrorModule,
  TuiInputModule,
  TuiToggleModule,
} from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';

import { ContractorCreateComponent } from './create/create.component';
import { ContractorListComponent } from './list/list.component';
import { ContractorRoutingModule } from './contractor-routing.module';
import {
  TuiButtonModule,
  TuiHintControllerModule,
  TuiLoaderModule,
} from '@taiga-ui/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContractorInfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    ContractorCreateComponent,
    ContractorInfoComponent,
    ContractorListComponent,
  ],
  imports: [
    CommonModule,
    ContractorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TuiAvatarModule,
    TuiButtonModule,
    TuiCheckboxBlockModule,
    TuiFieldErrorModule,
    TuiHintControllerModule,
    TuiInputModule,
    TuiLetModule,
    TuiLoaderModule,
    TuiToggleModule,
  ],
})
export class ContractorModule {}
