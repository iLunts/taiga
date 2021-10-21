import { BankAccount } from './bank.model';
import * as moment from 'moment';

export class Profile {
  _id: string;
  _createdDate: string;
  _userId: string;
  _type: number; // 1 - фирма, 2 - ИП

  info: ProfileInfo;
  mailingAddress: ProfileAddress;
  juridicalAddress: ProfileAddress;
  bankAccount: BankAccount;
  responsiblePerson: ResponsiblePerson;
  contacts: Contact[];

  constructor(
    _id?: string,
    _createdDate?: string,
    _userId?: string,
    _type?: number,
    info?: ProfileInfo,
    mailingAddress?: ProfileAddress,
    juridicalAddress?: ProfileAddress,
    bankAccount?: BankAccount,
    responsiblePerson?: ResponsiblePerson,
    contacts?: Contact[]
  ) {
    this._id = this._id || null;
    this._userId = this._userId || null;
    this._createdDate = this._createdDate || moment().toString() || null;
    this._type = this._type || 1;
    this.info = info || new ProfileInfo();
    this.mailingAddress = mailingAddress || new ProfileAddress();
    this.juridicalAddress = juridicalAddress || new ProfileAddress();
    this.bankAccount = bankAccount || new BankAccount();
    this.responsiblePerson = responsiblePerson || null;
    this.contacts = contacts || [];
  }
}

export class ProfileAddress {
  zipCode: string;
  country: string;
  countryType: string;
  city: string;
  street: string;
  houseNumber: string;
  office: string;
  email: string;
  phone: string;
  fax: string;

  constructor(
    zipCode?: string,
    country?: string,
    countryType?: string,
    city?: string,
    street?: string,
    houseNumber?: string,
    office?: string,
    email?: string,
    phone?: string,
    fax?: string
  ) {
    this.zipCode = zipCode || null;
    this.country = country || null;
    this.countryType = countryType || null;
    this.city = city || null;
    this.street = street || null;
    this.houseNumber = houseNumber || null;
    this.office = office || null;
    this.email = email || null;
    this.phone = phone || null;
    this.fax = fax || null;
  }

  // getAddressFromEGR(data: any) {
  //   let obj = new ContractorAddress();
  //   return obj;
  // }
}

export class ProfileInfo {
  fullName?: string;
  fullNameBel?: string;
  shortName?: string;
  shortNameBel?: string;
  name?: string;
  nameBel?: string;
  registrationDate?: string;
  unp?: string;
  isBlocked?: boolean;
  isActive?: boolean;

  constructor(
    fullName?: string,
    fullNameBel?: string,
    shortName?: string,
    shortNameBel?: string,
    name?: string,
    nameBel?: string,
    registrationDate?: string,
    unp?: string,
    isBlocked?: boolean,
    isActive?: boolean
  ) {
    this.fullName = fullName || null;
    this.fullNameBel = fullNameBel || null;
    this.shortName = shortName || null;
    this.shortNameBel = shortNameBel || null;
    this.name = name || null;
    this.nameBel = nameBel || null;
    this.registrationDate = registrationDate || null;
    this.unp = unp || null;
    this.isBlocked = isBlocked || false;
    this.isActive = isActive || true;
  }
}

export class Contact {
  fullName?: string;
  basis?: string;
  phone?: string;
  email?: string;
  viber?: string;
  telegram?: string;

  constructor(fullName?: string, basis?: string) {
    this.fullName = fullName || null;
    this.basis = basis || null;
  }
}

export class ResponsiblePerson {
  fullName?: string;
  basis?: string;

  constructor(fullName?: string, basis?: string) {
    this.fullName = fullName || null;
    this.basis = basis || null;
  }
}
