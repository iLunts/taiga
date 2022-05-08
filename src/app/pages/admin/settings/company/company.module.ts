import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyComponent } from './company.component';
import { CompanyRoutingModule } from './company-routing.module';
import { LogotypeComponent } from './tabs/logotype/logotype.component';
import { InformationComponent } from './tabs/information/information.component';
import { BanksComponent } from './tabs/banks/banks.component';
import {
  TuiButtonModule,
  TuiNotificationModule,
  TuiScrollbarModule
} from '@taiga-ui/core';
import {
  TuiAccordionModule,
  TuiBadgeModule,
  TuiInputNumberModule,
  TuiIslandModule,
  TuiMarkerIconModule
} from '@taiga-ui/kit';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { ResponsiblePersonComponent } from './tabs/responsible-person/responsible-person.component';
import { ResponsiblePersonModule } from 'src/app/shared/components/responsible-person/responsible-person.module';

@NgModule({
  declarations: [
    CompanyComponent,
    LogotypeComponent,
    InformationComponent,
    BanksComponent,
    ResponsiblePersonComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    HeaderModule,
    ResponsiblePersonModule,
    SharedModule,
    TuiAccordionModule,
    TuiBadgeModule,
    TuiButtonModule,
    TuiInputNumberModule,
    TuiIslandModule,
    TuiMarkerIconModule,
    TuiNotificationModule,
    TuiScrollbarModule
  ],
  exports: [CompanyComponent]
})
export class CompanyModule {}
