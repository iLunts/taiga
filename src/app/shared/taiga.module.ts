import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    TuiNotificationsModule,
    TuiDialogModule,
    TuiRootModule,
    TuiButtonModule,
    TuiSvgModule,
    TuiCalendarModule,
} from '@taiga-ui/core';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TuiButtonModule,
    TuiCalendarModule,
    TuiDialogModule,
    TuiNotificationsModule,
    TuiRootModule,
    TuiSvgModule,
  ],
  exports: [
    TuiButtonModule,
    TuiCalendarModule,
    TuiDialogModule,
    TuiNotificationsModule,
    TuiRootModule,
    TuiSvgModule,
  ]
})
export class TaigaModule { }
