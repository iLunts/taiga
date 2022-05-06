import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiAccordionModule,
  TuiInputNumberModule,
  TuiIslandModule,
  TuiMarkerIconModule
} from '@taiga-ui/kit';
import { TuiButtonModule, TuiScrollbarModule } from '@taiga-ui/core';

import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
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
    TuiScrollbarModule
  ],
  exports: [SettingsComponent]
})
export class SettingsModule {}
