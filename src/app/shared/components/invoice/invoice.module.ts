import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicePanelComponent } from './invoice-panel/invoice-panel.component';
import { TuiLetModule } from '@taiga-ui/cdk';

@NgModule({
  declarations: [
    InvoicePanelComponent
  ],
  imports: [
    CommonModule,
    TuiLetModule,
  ],
  exports: [
    InvoicePanelComponent
  ],
})
export class InvoiceModule { }
