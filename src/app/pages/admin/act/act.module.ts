import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActRoutingModule } from './act-routing.module';
import { ActCreateComponent } from './create/create.component';
import { ActListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiTabsModule } from '@taiga-ui/kit';
import { HeaderModule } from 'src/app/shared/components/header/header.module';

@NgModule({
  declarations: [ActCreateComponent, ActListComponent],
  imports: [
    CommonModule,
    // ContractorModule,
    ActRoutingModule,
    SharedModule,
    HeaderModule,
    // TuiAvatarModule,
    TuiButtonModule,
    // TuiHintControllerModule,
    // TuiHostedDropdownModule,
    // TuiInputDateRangeModule,
    // TuiInputFileModule,
    // TuiInputInlineModule,
    // TuiInputNumberModule,
    TuiLetModule,
    TuiTabsModule,
    // TuiTextAreaModule,
  ],
  exports: [ActCreateComponent, ActListComponent],
})
export class ActModule {}
