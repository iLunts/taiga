import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicePanelComponent } from './service-panel/service-panel.component';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiGroupModule, TuiLabelModule, TuiLoaderModule, TuiTableModeModule } from '@taiga-ui/core';
import { ServiceTableComponent } from './service-table/service-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiInputCountModule, TuiInputDateModule, TuiInputModule, TuiInputNumberModule, TuiSelectModule } from '@taiga-ui/kit';
import { TuiTableModule } from '@taiga-ui/addon-table';


@NgModule({
  declarations: [
    ServicePanelComponent,
    ServiceTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiGroupModule,
    TuiInputCountModule,
    TuiInputDateModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiLabelModule,
    TuiLetModule,
    TuiLoaderModule,
    TuiSelectModule,
    TuiTableModeModule,
    TuiTableModule,
  ],
  exports: [
    ServicePanelComponent,
    ServiceTableComponent,
  ],
})
export class ServiceModule { }
