import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyComponent } from './company.component';
import { CompanyRoutingModule } from './company-routing.module';
import { LogotypeComponent } from './tabs/logotype/logotype.component';
import { InformationComponent } from './tabs/information/information.component';
import { BanksComponent } from './tabs/banks/banks.component';
import { TuiButtonModule } from '@taiga-ui/core';
import {
  TuiAccordionModule,
  TuiInputNumberModule,
  TuiIslandModule,
  TuiMarkerIconModule
} from '@taiga-ui/kit';
import { SharedModule } from 'src/app/shared/shared.module';

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
    SharedModule,
    TuiButtonModule,
    TuiAccordionModule,
    TuiInputNumberModule,
    TuiIslandModule,
    TuiMarkerIconModule
  ],
  exports: [CompanyComponent]
})
export class CompanyModule {}
