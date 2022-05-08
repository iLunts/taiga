import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiLetModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiFormatNumberPipeModule,
  TuiHintControllerModule,
  TuiHostedDropdownModule,
  TuiScrollbarModule
} from '@taiga-ui/core';
import {
  TuiAvatarModule,
  TuiBadgeModule,
  TuiInputDateRangeModule,
  TuiInputFileModule,
  TuiInputInlineModule,
  TuiInputNumberModule,
  TuiTabsModule,
  TuiTextAreaModule
} from '@taiga-ui/kit';

import { ContractModule } from 'src/app/shared/components/contract/contract.module';
import { ContractorModule } from 'src/app/shared/components/contractor/contractor.module';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { RentalCertificateCreateComponent } from './create/create.component';
import { RentalCertificateListComponent } from './list/list.component';
import { RentalCertificateRoutingModule } from './rental-certificate-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RentalCertificateCreateComponent,
    RentalCertificateListComponent
  ],
  imports: [
    CommonModule,
    ContractModule,
    ContractorModule,
    FormsModule,
    HeaderModule,
    ReactiveFormsModule,
    RentalCertificateRoutingModule,
    SharedModule,
    TuiAvatarModule,
    TuiBadgeModule,
    TuiButtonModule,
    TuiCurrencyPipeModule,
    TuiFormatNumberPipeModule,
    TuiHintControllerModule,
    TuiHostedDropdownModule,
    TuiInputDateRangeModule,
    TuiInputFileModule,
    TuiInputInlineModule,
    TuiInputNumberModule,
    TuiLetModule,
    TuiTabsModule,
    TuiTextAreaModule,
    TuiScrollbarModule
  ]
})
export class RentalCertificateModule {}
