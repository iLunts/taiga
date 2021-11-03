import { TuiDay } from '@taiga-ui/cdk';
import { Unit } from './unit.model';

export class Service {
  _id: string;
  _userId: string;
  _groupId: string;
  date: TuiDay;
  desc: string;
  count: number;
  groupName: string;
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
