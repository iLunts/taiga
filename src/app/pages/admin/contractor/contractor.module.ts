import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TuiAvatarModule, TuiCheckboxBlockModule, TuiInputModule, TuiToggleModule, TuiFieldErrorPipeModule } from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';

import { ContractorCreateComponent } from './create/create.component';
import { ContractorListComponent } from './list/list.component';
import { ContractorRoutingModule } from './contractor-routing.module';
import { TuiButtonModule, TuiLoaderModule, TuiNotificationModule, TuiScrollbarModule, TuiHintModule } from '@taiga-ui/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContractorInfoComponent } from './info/info.component';
import { ResponsiblePersonModule } from 'src/app/shared/components/responsible-person/responsible-person.module';
import { HeaderModule } from 'src/app/shared/components/header/header.module';

@NgModule({
  declarations: [
    ContractorCreateComponent,
    ContractorInfoComponent,
    ContractorListComponent
  ],
  imports: [
    CommonModule,
    ContractorRoutingModule,
    FormsModule,
    HeaderModule,
    ReactiveFormsModule,
    ResponsiblePersonModule,
    SharedModule,
    TuiAvatarModule,
    TuiButtonModule,
    TuiCheckboxBlockModule,
    TuiFieldErrorPipeModule,
    TuiHintModule,
    TuiInputModule,
    TuiLetModule,
    TuiLoaderModule,
    TuiScrollbarModule,
    TuiToggleModule,
    TuiNotificationModule
  ]
})
export class ContractorModule {}
