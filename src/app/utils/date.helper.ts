import { TuiDay } from '@taiga-ui/cdk';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Service } from '../models/service.model';

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

  public static getMinDayFromServices(services: Service[]): any {
    return _.minBy(services, (service: any) =>
      moment(service.date, 'YYYY-MM-DD').toDate()
    );
  }

  public static getMaxDayFromServices(services: Service[]): Date {
    return _.maxBy(services, (service: any) =>
      moment(service.date, 'YYYY-MM-DD').toDate()
    );
  }

  public static getDateFromString(
    date: string,
    format: string = 'YYYY-MM-DD'
  ): Date {
    return moment(date, format).toDate();
  }

  public static convertTuiDateToDate(date: TuiDay): Date {
    return moment([date.year, date.month, date.day]).toDate();
  }
}
