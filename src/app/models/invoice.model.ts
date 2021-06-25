import { Service } from './service.model';
import { Contractor } from './company.model';
import { Profile } from './profile.model';
import * as moment from 'moment';
import * as _ from 'lodash';
import { TuiDay } from '@taiga-ui/cdk';

export class Invoice {
  _id: string;
  _actId: string;
  _contractId: string;
  _createdDate: Date;
  _userId: string;
  contractor: Contractor;
  dateRange: TuiDay;
  description: string;
  number: string;
  profile: Profile;
  qrCode: string;
  services: Service[];
  signature: Signature;
  status: InvoiceStatus;
  total: TotalSum;
  type: string;

  constructor(
    _id?: string,
    _actId?: string,
    _contractId?: string,
    _createdDate?: Date,
    _userId?: string,
    contractor?: Contractor,
    dateRange?: TuiDay,
    description?: string,
    number?: string,
    profile?: Profile,
    qrCode?: string,
    services?: Service[],
    signature?: Signature,
    status?: InvoiceStatus,
    total?: TotalSum,
    type?: string
  ) {
    this._id = _id || null;
    this._userId = _userId || null;
    this._contractId = _contractId || null;
    this._actId = _actId || null;
    this._createdDate = _createdDate || new Date();
    this.number = number || null;
    this.contractor = contractor || new Contractor();
    this.profile = profile || new Profile();
    this.services = services || [];
    this.dateRange =
      dateRange ||
      TuiDay.normalizeParse(moment().add(7, 'day').format('DD.MM.YYYY'));
    this.status = status || null;
    this.description = description || null;
    this.type = type || null;
    this.signature = signature || new Signature();
    this.total = total || new TotalSum();
    this.qrCode = qrCode || null;
  }

  isValid(invoice: Invoice): boolean {
    let valid = false;

    // console.warn('WARN: ', _.isEmpty(null));

    valid =
      invoice?.services?.length && invoice?.status && invoice?.contractor
        ? true
        : false;
    // valid = !_.values(invoice.status).every(_.isEmpty);
    // return invoice?.status ? invoice?.status?.isValid(invoice.status) : false;
    return valid;
  }
}

export class InvoiceStatus {
  _id: string;
  name: string;
  color: string;
  order: number;

  constructor(_id: string, name: string, color: string, order: number) {
    this._id = _id;
    this.name = name;
    this.color = color;
    this.order = order;
  }

  isValid(status: InvoiceStatus): boolean {
    if (status) {
      return status ? _.some(status, _.isEmpty) : false;
    } else {
      return false;
    }
  }
}

export class Price {
  amount: number;
  currency: number;
  code: string;

  constructor(amount?: number, currency?: number, code?: string) {
    this.amount = amount || 0;
    this.currency = amount || 913;
    this.code = code || 'BYN';
  }
}

export class TotalSum {
  totalSum: Price;
  taxSum: Price;

  constructor(totalSum?: Price, taxSum?: Price) {
    this.totalSum = totalSum || new Price();
    this.taxSum = taxSum || new Price();
  }
}

export class InvoiceListItem {
  service: Service;
  quantity: number;

  constructor(service?: Service, quantity?: number) {
    this.service = service || null;
    this.quantity = quantity || 1;
  }
}

export class Signature {
  sign: string;
  firstName: string;
  lastName: string;
  initials: string;

  constructor(
    sign?: string,
    firstName?: string,
    lastName?: string,
    initials?: string
  ) {
    this.sign = sign || null;
    this.firstName = firstName || null;
    this.lastName = lastName || null;
    this.initials = initials || null;
  }
}
