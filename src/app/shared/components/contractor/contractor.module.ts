import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiLoaderModule,
  TuiScrollbarModule
} from '@taiga-ui/core';
import {
  TuiAvatarModule,
  TuiBadgeModule,
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiSelectModule
} from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';

import { ContractorPanelComponent } from './contractor-panel/contractor-panel.component';
import { ContractorAsideComponent } from './contractor-aside/contractor-aside.component';

@NgModule({
  declarations: [ContractorPanelComponent, ContractorAsideComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiAvatarModule,
    TuiButtonModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiInputModule,
    TuiLetModule,
    TuiLoaderModule,
    TuiSelectModule,
    TuiBadgeModule,
    TuiScrollbarModule
  ],
  exports: [ContractorPanelComponent, ContractorAsideComponent]
})
export class ContractorModule {}
