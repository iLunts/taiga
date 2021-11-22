import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyComponent } from './company.component';
import { CompanyRoutingModule } from './company-routing.module';
import { LogotypeComponent } from './tabs/logotype/logotype.component';
import { InformationComponent } from './tabs/information/information.component';
import { BanksComponent } from './tabs/banks/banks.component';
import { TuiButtonModule, TuiNotificationModule } from '@taiga-ui/core';
import {
  TuiAccordionModule,
  TuiBadgeModule,
  TuiInputNumberModule,
  TuiIslandModule,
  TuiMarkerIconModule
} from '@taiga-ui/kit';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderModule } from 'src/app/shared/components/header/header.module';

@NgModule({
  declarations: [
    CompanyComponent,
    LogotypeComponent,
    InformationComponent,
    BanksComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    HeaderModule,
    SharedModule,
    TuiAccordionModule,
    TuiBadgeModule,
    TuiButtonModule,
    TuiInputNumberModule,
    TuiIslandModule,
    TuiMarkerIconModule,
    TuiNotificationModule
  ],
  exports: [CompanyComponent]
})
export class CompanyModule {}
