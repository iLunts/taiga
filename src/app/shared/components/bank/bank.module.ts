import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankSelectComponent } from './bank-select/bank-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit/components/input';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiDataListModule } from '@taiga-ui/core/components/data-list';

@NgModule({
  declarations: [BankSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiLetModule,
    TuiDataListModule,
  ],
  exports: [BankSelectComponent],
})
export class BankModule {}
