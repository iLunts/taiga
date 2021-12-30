import { TuiDay } from '@taiga-ui/cdk';
import { Unit } from './unit.model';

export class Service {
  _id: string;
  _userId: string;
  date: TuiDay;
  desc: string;
  count: number;
  group: ServiceGroup;
  name: string;
  price: number;
  tax: number;
  unit: Unit;
  isFreePrice: boolean;
}

export class ServiceGroup {
  _id: string;
  _userId: string;
  name: string;
  desc: string;
}
