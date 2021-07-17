import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {
  TuiAvatarModule,
  TuiInputModule,
  TuiToggleModule,
} from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';

import { ContractorCreateComponent } from './create/create.component';
import { ContractorListComponent } from './list/list.component';
import { ContractorRoutingModule } from './contractor-routing.module';
import { TuiButtonModule, TuiHintControllerModule } from '@taiga-ui/core';
// import { ImageCropperModule } from 'ngx-image-cropper';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ContractorListComponent, ContractorCreateComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ContractorRoutingModule,
    // ImageCropperModule,
    TuiAvatarModule,
    TuiButtonModule,
    TuiButtonModule,
    TuiHintControllerModule,
    TuiInputModule,
    TuiLetModule,
    TuiToggleModule,
    // TuiInputDateRangeModule,
    // TuiInputNumberModule,
    // TuiInputDateModule,
    // TuiDataListModule,
    // TuiHostedDropdownModule,
  ],
})
export class ContractorModule {}
