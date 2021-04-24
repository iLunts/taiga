import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractorPanelComponent } from './contractor-panel/contractor-panel.component';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiLoaderModule } from '@taiga-ui/core';

@NgModule({
  declarations: [
    ContractorPanelComponent
  ],
  imports: [
    CommonModule,
    TuiLetModule,
    TuiLoaderModule,
  ],
  exports: [
    ContractorPanelComponent
  ],
})
export class ContractorModule { }
