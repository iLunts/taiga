import { TuiDay } from '@taiga-ui/cdk';
import { Price } from './price.model';
import { Tax } from './tax.model';
import { Unit } from './unit.model';

export class Service {
  _id: string;
  _userId: string;
  date: TuiDay;
  desc: string;
  count: Count;
  group: ServiceGroup;
  name: string;
  price: Price;
  tax: Tax;
  unit: Unit;
  isFreePrice: boolean;
}

export class ServiceGroup {
  _id: string;
  _userId: string;
  name: string;
  desc: string;
}

export class Count {
  amount: number;
  isEditable: boolean;
}
