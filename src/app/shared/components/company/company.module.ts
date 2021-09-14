import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';
import { TuiAvatarModule } from '@taiga-ui/kit/components/avatar';
import { TuiButtonModule } from '@taiga-ui/core/components/button';
import { TuiFieldErrorModule, TuiInputModule } from '@taiga-ui/kit';
import { TuiLoaderModule } from '@taiga-ui/core/components/loader';

import { CompanyPanelComponent } from './company-panel/company-panel.component';
import { CompanyUnpComponent } from './company-unp/company-unp.component';

@NgModule({
  declarations: [CompanyPanelComponent, CompanyUnpComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiAvatarModule,
    TuiLoaderModule,
    TuiButtonModule,
    TuiFieldErrorModule,
    TuiInputModule,
    TextMaskModule,
  ],
  exports: [CompanyPanelComponent, CompanyUnpComponent],
})
export class CompanyModule {}
