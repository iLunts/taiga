import { NgModule } from '@angular/core';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CalendarComponent],
  imports: [
    SharedModule,
    CalendarRoutingModule
  ]
})
export class CalendarModule { }
