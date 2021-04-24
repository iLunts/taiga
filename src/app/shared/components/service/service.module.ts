import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicePanelComponent } from './service-panel/service-panel.component';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiLoaderModule } from '@taiga-ui/core';


@NgModule({
  declarations: [ServicePanelComponent],
  imports: [
    CommonModule,
    TuiLetModule,
    TuiLoaderModule,
  ],
  exports: [ServicePanelComponent],
})
export class ServiceModule { }
