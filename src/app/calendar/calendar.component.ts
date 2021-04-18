import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TuiDay, TuiDayRange, TuiMonth } from '@taiga-ui/cdk';
import { TuiBaseColor, TuiColor, TuiMarkerHandler } from '@taiga-ui/core';

const TWO_DOTS: [TuiColor, TuiColor] = [TuiBaseColor.Primary, TuiBaseColor.Secondary];
const ONE_DOT: [TuiColor] = [TuiBaseColor.Success];

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  testValue: string = 'Some test';

  readonly markerHandler: TuiMarkerHandler = (day: TuiDay) =>
        day.day % 2 === 0 ? TWO_DOTS : ONE_DOT;

    value: TuiDayRange | null = null;

    firstMonth = TuiMonth.currentLocal();

    middleMonth = TuiMonth.currentLocal().append({month: 1});

    lastMonth = TuiMonth.currentLocal().append({month: 2});

    hoveredItem: TuiDay | null = null;

    onDayClick(day: TuiDay): void {
        if (this.value === null || !this.value.isSingleDay) {
            this.value = new TuiDayRange(day, day);
        }

        this.value = TuiDayRange.sort(this.value.from, day);
    }

    onMonthChangeFirst(month: TuiMonth): void {
        this.firstMonth = month;
        this.middleMonth = month.append({month: 1});
        this.lastMonth = month.append({month: 2});
    }

    onMonthChangeMiddle(month: TuiMonth): void {
        this.firstMonth = month.append({month: -1});
        this.middleMonth = month;
        this.lastMonth = month.append({month: 1});
    }

    onMonthChangeLast(month: TuiMonth): void {
        this.firstMonth = month.append({month: -2});
        this.middleMonth = month.append({month: -1});
        this.lastMonth = month;
    }
}
