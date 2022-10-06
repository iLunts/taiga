import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';
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

  public static getTuiDayRangeFromServices(services: Service[]): TuiDayRange {
    console.log('call start getTuiDayRangeFromServices(): ', services);
    if (services && services.length) {
      let tuiDayRange: { from: TuiDay; to: TuiDay } = { from: null, to: null };
      tuiDayRange.from = this.getFirstTuiDay(
        this.getTuiDateArrayFromService(services)
      );
      tuiDayRange.to = this.getLastTuiDay(
        this.getTuiDateArrayFromService(services)
      );
      console.log('call getTuiDayRangeFromServices(): ', tuiDayRange);
      return tuiDayRange as TuiDayRange;
    } else {
      return { from: null, to: null } as TuiDayRange;
    }
  }

  public static getDatesArrayFromServices(services: Service[]): Date[] {
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

  public static getFirstDay(days: Date[]): TuiDay {
    const sortedAsc = days.sort(
      (objA, objB) => objA.getTime() - objB.getTime()
    );
    return TuiDay.fromLocalNativeDate(sortedAsc[sortedAsc.length - 1]);
  }

  public static getFirstTuiDay(days: TuiDay[]): TuiDay {
    let daysArray: Date[] = [];
    days.forEach((element) => {
      const date = TuiDay.jsonParse(element.toString());
      daysArray.push(new Date(date.year, date.month, date.day));
    });

    const sortedAsc = daysArray.sort(
      (objA, objB) => objA.getTime() - objB.getTime()
    );
    return TuiDay.fromLocalNativeDate(sortedAsc[sortedAsc.length - 1]);
  }

  public static getLastDay(days: Date[]): TuiDay {
    const sortedAsc = days.sort(
      (objA, objB) => objB.getTime() - objA.getTime()
    );
    return TuiDay.fromLocalNativeDate(sortedAsc[sortedAsc.length - 1]);
  }

  public static getLastTuiDay(days: TuiDay[]): TuiDay {
    let daysArray: Date[] = [];
    days.forEach((element) => {
      const date = TuiDay.jsonParse(element.toString());
      daysArray.push(new Date(date.year, date.month, date.day));
    });

    const sortedAsc = daysArray.sort(
      (objA, objB) => objB.getTime() - objA.getTime()
    );
    return TuiDay.fromLocalNativeDate(sortedAsc[sortedAsc.length - 1]);
  }

  public static getTuiDateArrayFromService(services: Service[]): TuiDay[] {
    const tuiDateList = [];
    services.forEach((element) => {
      tuiDateList.push(element.date);
    });
    return tuiDateList;
  }
}
