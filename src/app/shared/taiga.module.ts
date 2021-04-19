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
} from '@taiga-ui/core';
import { TuiAvatarModule, TuiBadgedContentModule, TuiInputModule, TuiInputPasswordModule, TuiIslandModule } from '@taiga-ui/kit';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TuiAvatarModule,
    TuiBadgedContentModule,
    TuiButtonModule,
    TuiCalendarModule,
    TuiDataListModule,
    TuiDialogModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiIslandModule,
    TuiNotificationsModule,
    TuiRootModule,
    TuiSvgModule,
  ],
  exports: [
    TuiAvatarModule,
    TuiBadgedContentModule,
    TuiButtonModule,
    TuiCalendarModule,
    TuiDataListModule,
    TuiDialogModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiIslandModule,
    TuiNotificationsModule,
    TuiRootModule,
    TuiSvgModule,
  ]
})
export class TaigaModule { }
