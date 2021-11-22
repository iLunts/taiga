import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit/components/input';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiDataListModule } from '@taiga-ui/core/components/data-list';
import { TuiLoaderModule, TuiButtonModule } from '@taiga-ui/core';
import { TuiAvatarModule } from '@taiga-ui/kit';

import { BankSelectComponent } from './bank-select/bank-select.component';
import { BankPanelComponent } from './bank-panel/bank-panel.component';

@NgModule({
  declarations: [BankSelectComponent, BankPanelComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiLetModule,
    TuiDataListModule,
    TuiAvatarModule,
    TuiLoaderModule,
    TuiButtonModule
  ],
  exports: [BankSelectComponent, BankPanelComponent]
})
export class BankModule {}
