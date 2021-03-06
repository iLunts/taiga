import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiInputModule } from '@taiga-ui/kit';

import { InvoicePanelComponent } from './invoice-panel/invoice-panel.component';

@NgModule({
  declarations: [
    InvoicePanelComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiLetModule,
    TuiInputModule,
  ],
  exports: [
    InvoicePanelComponent,
  ],
})
export class InvoiceModule { }
