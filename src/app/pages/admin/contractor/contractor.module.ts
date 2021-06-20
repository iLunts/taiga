import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';

import { ContractorCreateComponent } from './create/create.component';
import { ContractorListComponent } from './list/list.component';
import { ContractorRoutingModule } from './contractor-routing.module';
import { TuiButtonModule } from '@taiga-ui/core';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [ContractorListComponent, ContractorCreateComponent],
  imports: [
    CommonModule,
    ContractorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TuiLetModule,
    TuiInputModule,
    TuiButtonModule,
    ImageCropperModule,
  ],
})
export class ContractorModule {}
