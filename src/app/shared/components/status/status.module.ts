import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusPanelComponent } from './status-panel/status-panel.component';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiLoaderModule } from '@taiga-ui/core';

@NgModule({
  declarations: [
    StatusPanelComponent
  ],
  imports: [
    CommonModule,
    TuiLetModule,
    TuiLoaderModule,
  ],
  exports: [
    StatusPanelComponent
  ],
})
export class StatusModule { }
