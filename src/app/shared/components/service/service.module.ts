import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiDataListModule, TuiGroupModule, TuiLabelModule, TuiLoaderModule, TuiTableModeModule } from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiInputCountModule, TuiInputDateModule, TuiInputModule, TuiInputNumberModule, TuiSelectModule } from '@taiga-ui/kit';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiMoneyModule } from '@taiga-ui/addon-commerce';

import { ServicePanelComponent } from './service-panel/service-panel.component';
import { ServiceTableComponent } from './service-table/service-table.component';


@NgModule({
  declarations: [ServicePanelComponent, ServiceTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
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
    TuiMoneyModule,
  ],
  exports: [ServicePanelComponent, ServiceTableComponent],
})
export class ServiceModule {}
