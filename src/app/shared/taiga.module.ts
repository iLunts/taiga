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
import { TuiAvatarModule, TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TuiAvatarModule,
    TuiButtonModule,
    TuiCalendarModule,
    TuiDialogModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiNotificationsModule,
    TuiRootModule,
    TuiSvgModule,
  ],
  exports: [
    TuiAvatarModule,
    TuiButtonModule,
    TuiCalendarModule,
    TuiDialogModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiNotificationsModule,
    TuiRootModule,
    TuiSvgModule,
  ]
})
export class TaigaModule { }
