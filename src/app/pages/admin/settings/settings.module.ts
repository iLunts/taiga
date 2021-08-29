import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiAccordionModule,
  TuiInputNumberModule,
  TuiIslandModule,
  TuiMarkerIconModule,
} from '@taiga-ui/kit';

import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TuiButtonModule } from '@taiga-ui/core';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule,
    SettingsRoutingModule,
    TuiButtonModule,
    TuiAccordionModule,
    TuiInputNumberModule,
    TuiIslandModule,
    TuiMarkerIconModule,
  ],
  exports: [SettingsComponent],
})
export class SettingsModule {}
