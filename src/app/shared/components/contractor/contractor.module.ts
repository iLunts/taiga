import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiDataListModule, TuiLoaderModule } from '@taiga-ui/core';
import {
  TuiAvatarModule,
  TuiDataListWrapperModule,
  TuiSelectModule
} from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';

import { ContractorPanelComponent } from './contractor-panel/contractor-panel.component';

@NgModule({
  declarations: [ContractorPanelComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiAvatarModule,
    TuiLetModule,
    TuiLoaderModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule
  ],
  exports: [ContractorPanelComponent]
})
export class ContractorModule {}
