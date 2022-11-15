import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiDialogModule, TuiRootModule, TuiButtonModule, TuiSvgModule, TuiCalendarModule, TuiDataListModule, TuiThemeNightModule, TuiModeModule, TuiScrollbarModule, TuiAlertModule } from '@taiga-ui/core';
import {
  TuiAccordionModule,
  TuiAvatarModule,
  TuiBadgedContentModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiIslandModule,
  TuiMarkerIconModule
} from '@taiga-ui/kit';
import { TuiMoneyModule } from '@taiga-ui/addon-commerce';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { DragDropModule } from '@angular/cdk/drag-drop';
// import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
// import { TuiActiveZoneModule } from '@taiga-ui/cdk';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TuiAccordionModule,
    TuiAvatarModule,
    TuiBadgedContentModule,
    TuiButtonModule,
    TuiCalendarModule,
    TuiDataListModule,
    TuiDialogModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiIslandModule,
    TuiModeModule,
    TuiMoneyModule,
    TuiAlertModule,
    TuiRootModule,
    TuiSvgModule,
    TuiTableModule,
    TuiThemeNightModule,
    TuiMarkerIconModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiScrollbarModule,
    // TuiSidebarModule,
    // TuiActiveZoneModule,
    DragDropModule
  ],
  exports: [
    TuiAccordionModule,
    TuiAvatarModule,
    TuiBadgedContentModule,
    TuiButtonModule,
    TuiCalendarModule,
    TuiDataListModule,
    TuiDialogModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiIslandModule,
    TuiModeModule,
    TuiMoneyModule,
    TuiAlertModule,
    TuiRootModule,
    TuiSvgModule,
    TuiTableModule,
    TuiThemeNightModule,
    TuiMarkerIconModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiScrollbarModule,
    // TuiSidebarModule,
    // TuiActiveZoneModule,
    DragDropModule
  ]
})
export class TaigaModule {}
