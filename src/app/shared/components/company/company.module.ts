import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';
import { TuiAvatarModule } from '@taiga-ui/kit/components/avatar';
import { TuiButtonModule } from '@taiga-ui/core/components/button';
import {
  TuiCheckboxBlockModule,
  TuiFieldErrorModule,
  TuiInputModule,
} from '@taiga-ui/kit';
import { TuiLoaderModule } from '@taiga-ui/core/components/loader';

import { CompanyAddressComponent } from './company-address/company-address.component';
import { CompanyPanelComponent } from './company-panel/company-panel.component';
import { CompanyUnpComponent } from './company-unp/company-unp.component';
import {
  TuiExpandModule,
  TuiNotificationModule,
  TuiTooltipModule,
} from '@taiga-ui/core';
import { CompanyBankComponent } from './company-bank/company-bank.component';
import { BankModule } from '../bank/bank.module';

@NgModule({
  declarations: [
    CompanyPanelComponent,
    CompanyUnpComponent,
    CompanyAddressComponent,
    CompanyBankComponent,
  ],
  imports: [
    BankModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    TuiAvatarModule,
    TuiButtonModule,
    TuiCheckboxBlockModule,
    TuiExpandModule,
    TuiFieldErrorModule,
    TuiInputModule,
    TuiLoaderModule,
    TuiNotificationModule,
    TuiTooltipModule,
  ],
  exports: [
    CompanyPanelComponent,
    CompanyUnpComponent,
    CompanyAddressComponent,
    CompanyBankComponent,
  ],
})
export class CompanyModule {}
