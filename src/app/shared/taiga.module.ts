import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiNotificationsModule,
  TuiDialogModule,
  TuiRootModule,
  TuiButtonModule,
  TuiSvgModule,
  TuiCalendarModule,
  TuiDataListModule,
  TuiThemeNightModule,
  TuiModeModule,
} from '@taiga-ui/core';
import {
  TuiAccordionModule,
  TuiAvatarModule,
  TuiBadgedContentModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiIslandModule,
  TuiMarkerIconModule,
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
    TuiNotificationsModule,
    TuiRootModule,
    TuiSvgModule,
    TuiTableModule,
    TuiThemeNightModule,
    TuiMarkerIconModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    // TuiSidebarModule,
    // TuiActiveZoneModule,
    DragDropModule,
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
    TuiNotificationsModule,
    TuiRootModule,
    TuiSvgModule,
    TuiTableModule,
    TuiThemeNightModule,
    TuiMarkerIconModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    // TuiSidebarModule,
    // TuiActiveZoneModule,
    DragDropModule,
  ],
})
export class TaigaModule {}
