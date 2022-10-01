import { TuiDay } from '@taiga-ui/cdk';
import { Service } from '../models/service.model';
import * as moment from 'moment';
import * as _ from 'lodash';

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

  public static getMinDayFromServices(services: Service[]): Date {
    return new Date(
      Math.min.apply(null, this.getDatesArrayFromServices(services))
    );
  }

  public static getMaxDayFromServices(services: Service[]): Date {
    return new Date(
      Math.max.apply(null, this.getDatesArrayFromServices(services))
    );
  }

  public static getRangeDaysFromServices(services: Service[]): Date[] {
    const arrDates = [];
    arrDates.push(this.getMinDayFromServices(services));
    arrDates.push(this.getMaxDayFromServices(services));
    return arrDates;
  }

  public static getDatesArrayFromServices(services: Service[]): Date[] {
    debugger;
    if (services?.length) {
      const arrDates = [];
      services.forEach((service: Service) => {
        arrDates.push(
          moment(
            [service.date.year, service.date.month, service.date.day],
            'YYYY-MM-DD'
          ).toDate()
        );
      });
      return arrDates;
    } else {
      return [];
    }
  }

  public static convertTuiDateToDate(date: TuiDay): Date {
    moment.locale('ru');
    return moment([date.year, date.month, date.day]).toDate();
  }
}
