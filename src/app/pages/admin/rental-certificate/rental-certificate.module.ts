import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiLetModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiHintControllerModule,
  TuiHostedDropdownModule
} from '@taiga-ui/core';
import {
  TuiAvatarModule,
  TuiInputDateRangeModule,
  TuiInputFileModule,
  TuiInputInlineModule,
  TuiInputNumberModule,
  TuiTabsModule,
  TuiTextAreaModule
} from '@taiga-ui/kit';

import { ContractorModule } from 'src/app/shared/components/contractor/contractor.module';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { RentalCertificateCreateComponent } from './create/create.component';
import { RentalCertificateListComponent } from './list/list.component';
import { RentalCertificateRoutingModule } from './rental-certificate-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    RentalCertificateCreateComponent,
    RentalCertificateListComponent
  ],
  imports: [
    CommonModule,
    ContractorModule,
    HeaderModule,
    RentalCertificateRoutingModule,
    SharedModule,
    TuiAvatarModule,
    TuiButtonModule,
    TuiHintControllerModule,
    TuiHostedDropdownModule,
    TuiInputDateRangeModule,
    TuiInputFileModule,
    TuiInputInlineModule,
    TuiInputNumberModule,
    TuiLetModule,
    TuiTabsModule,
    TuiTextAreaModule
  ]
})
export class RentalCertificateModule {}
