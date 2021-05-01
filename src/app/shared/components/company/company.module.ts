import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyPanelComponent } from './company-panel/company-panel.component';
import { TuiAvatarModule } from '@taiga-ui/kit/components/avatar';
import { TuiLoaderModule } from '@taiga-ui/core/components/loader';
import { TuiButtonModule } from '@taiga-ui/core/components/button';

@NgModule({
  declarations: [
    CompanyPanelComponent
  ],
  imports: [
    CommonModule,
    TuiAvatarModule,
    TuiLoaderModule,
    TuiButtonModule,
  ],
  exports: [
    CompanyPanelComponent
  ],
})
export class CompanyModule {}
