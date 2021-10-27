import { TuiDay } from '@taiga-ui/cdk';
import * as moment from 'moment';

export class DateHelper {
  public static initDate(increment?: number): TuiDay {
    return TuiDay.normalizeParse(
      moment()
        .add(increment || 0, 'day')
        .format('DD.MM.YYYY')
    );
  }

  public static getDayArray(date: TuiDay): number[] {
    return [date.year, date.month, date.day];
  }
}
