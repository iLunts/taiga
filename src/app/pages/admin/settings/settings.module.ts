import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiAccordionModule, TuiInputNumberModule, TuiIslandModule, TuiMarkerIconModule } from '@taiga-ui/kit';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { CompanyComponent } from './company/company.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TuiButtonModule } from '@taiga-ui/core';


@NgModule({
  declarations: [SettingsComponent, CompanyComponent],
  imports: [
    CommonModule,
    SharedModule,
    SettingsRoutingModule,
    TuiButtonModule,
    TuiAccordionModule,
    TuiInputNumberModule,
    TuiIslandModule,
    TuiMarkerIconModule,
  ],
  exports: [SettingsComponent, CompanyComponent],
})
export class SettingsModule {}
