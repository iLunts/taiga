import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerPanelComponent } from './customer-panel/customer-panel.component';

@NgModule({
  declarations: [
    CustomerPanelComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CustomerPanelComponent,
  ]
})
export class CustomerModule { }
