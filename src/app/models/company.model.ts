export class Company {
  _id: string;
  _createdDate: string;
  _userId: string;
  _type: number;

  info: CompanyInfo;
  mailingAddress: CompanyAddress;
  juridicalAddress: CompanyAddress;
  bankAccount: BankAccount;
  person: Person;
  ved: CompanyVEDInfo[];

  constructor(
    _id?: string,
    _createdDate?: string,
    _userId?: string,
    _type?: number,
    info?: CompanyInfo,
    mailingAddress?: CompanyAddress,
    juridicalAddress?: CompanyAddress,
    bankAccount?: BankAccount,
    person?: Person
  ) {
    this._id = this._id || null;
    this._userId = this._userId || null;
    this._createdDate = this._createdDate || moment().toString() || null;
    this._type = this._type || 1;
    this.info = info || new CompanyInfo();
    this.mailingAddress = mailingAddress || new CompanyAddress();
    this.juridicalAddress = juridicalAddress || new CompanyAddress();
    this.bankAccount = bankAccount || new BankAccount();
    this.person = person || new Person();
  }

  isCompanyValid(company: Company): boolean {
    return (
      Object.values(company.info).every((c) => c !== null) &&
      this.isCompanyBankValid(company)
    );
  }

  isCompanyInfoValid(company: Company): boolean {
    return Object.values(company.info).every((c) => c !== null);
  }

  isCompanyBankValid(company: Company): boolean {
    const bank = company.bankAccount.bank;
    let status = true;

    if (
      !bank.CDBank ||
      !bank.NmBankShort ||
      !bank.CDHeadBank ||
      !bank.AdrBank ||
      bank.CdControl === 'ЗАКР'
    ) {
      status = false;
    }

    return status;
  }
}

export class CompanyAddress {
  zipCode: string;
  country: string;
  countryType: string;
  city: string;
  cityType: string;
  street: string;
  streetType: string;
  houseNumber: string;
  office: string;
  officeType: string;
  email: string;
  phone: string;
  fax: string;
  vnsfull: string;

  constructor(
    zipCode?: string,
    country?: string,
    countryType?: string,
    city?: string,
    cityType?: string,
    street?: string,
    streetType?: string,
    houseNumber?: string,
    office?: string,
    officeType?: string,
    email?: string,
    phone?: string,
    fax?: string,
    vnsfull?: string
  ) {
    this.zipCode = zipCode || null;
    this.country = country || null;
    this.countryType = countryType || null;
    this.city = city || null;
    this.cityType = cityType || null;
    this.street = street || null;
    this.streetType = streetType || null;
    this.houseNumber = houseNumber || null;
    this.office = office || null;
    this.officeType = officeType || null;
    this.email = email || null;
    this.phone = phone || null;
    this.fax = fax || null;
    this.vnsfull = vnsfull || null;
  }
}

export class CompanyInfo {
  fullName?: string;
  fullNameBel?: string;
  shortName?: string;
  shortNameBel?: string;
  name?: string;
  nameBel?: string;
  registrationDate?: string;
  unp?: string;

  constructor(
    fullName?: string,
    fullNameBel?: string,
    shortName?: string,
    shortNameBel?: string,
    name?: string,
    nameBel?: string,
    registrationDate?: string,
    unp?: string
  ) {
    this.fullName = fullName || null;
    this.fullNameBel = fullNameBel || null;
    this.shortName = shortName || null;
    this.shortNameBel = shortNameBel || null;
    this.name = name || null;
    this.nameBel = nameBel || null;
    this.registrationDate = registrationDate || null;
    this.unp = unp || null;
  }
}

export class Person {
  responsiblePerson?: string;
  basis?: string;

  constructor(responsiblePerson?: string, basis?: string) {
    this.responsiblePerson = responsiblePerson || null;
    this.basis = basis || null;
  }
}

export class CompanyVEDInfo {
  ngrn?: string;
  dfrom?: string;
  cact?: string;
  nsi00114?: {
    vkvdn: string;
    vnvdnp: string;
    nsi00114: string;
  };

  constructor(
    ngrn?: string,
    dfrom?: string,
    cact?: string,
    nsi00114?: { vkvdn: string; vnvdnp: string; nsi00114: string}
  ) {
    this.ngrn = ngrn || null;
    this.dfrom = dfrom || null;
    this.cact = cact || null;
    this.nsi00114 = nsi00114;
  }
}





import { BankAccount } from './bank.model';
import * as moment from 'moment';
import { isEmpty } from 'lodash';

export class Contractor {
  _id: string;
  _createdDate: string;
  _userId: string;
  _type: number;

  info: ContractorInfo;
  mailingAddress: ContractorAddress;
  juridicalAddress: ContractorAddress;
  bankAccount: BankAccount;
  person: Person;
  ved: VEDInfo[];

  constructor(
    _id?: string,
    _createdDate?: string,
    _userId?: string,
    _type?: number,
    info?: ContractorInfo,
    mailingAddress?: ContractorAddress,
    juridicalAddress?: ContractorAddress,
    bankAccount?: BankAccount,
    person?: CompanyPerson
  ) {
    this._id = this._id || null;
    this._userId = this._userId || null;
    this._createdDate = this._createdDate || moment().toString() || null;
    this._type = this._type || 1;
    this.info = info || new ContractorInfo();
    this.mailingAddress = mailingAddress || new ContractorAddress();
    this.juridicalAddress = juridicalAddress || new ContractorAddress();
    this.bankAccount = bankAccount || new BankAccount();
    this.person = person || new CompanyPerson();
  }
}

export class ContractorAddress {
  zipCode: string;
  country: string;
  countryType: string;
  city: string;
  cityType: string;
  street: string;
  streetType: string;
  houseNumber: string;
  office: string;
  officeType: string;
  email: string;
  phone: string;
  fax: string;
  vnsfull: string;

  constructor(
    zipCode?: string,
    country?: string,
    countryType?: string,
    city?: string,
    cityType?: string,
    street?: string,
    streetType?: string,
    houseNumber?: string,
    office?: string,
    officeType?: string,
    email?: string,
    phone?: string,
    fax?: string,
    vnsfull?: string
  ) {
    this.zipCode = zipCode || null;
    this.country = country || null;
    this.countryType = countryType || null;
    this.city = city || null;
    this.cityType = cityType || null;
    this.street = street || null;
    this.streetType = streetType || null;
    this.houseNumber = houseNumber || null;
    this.office = office || null;
    this.officeType = officeType || null;
    this.email = email || null;
    this.phone = phone || null;
    this.fax = fax || null;
    this.vnsfull = vnsfull || null;
  }

  // getAddressFromEGR(data: any) {
  //   let obj = new ContractorAddress();
  //   return obj;
  // }
}

export class ContractorInfo {
  fullName?: string;
  fullNameBel?: string;
  shortName?: string;
  shortNameBel?: string;
  name?: string;
  nameBel?: string;
  registrationDate?: string;
  unp?: string;

  constructor(
    fullName?: string,
    fullNameBel?: string,
    shortName?: string,
    shortNameBel?: string,
    name?: string,
    nameBel?: string,
    registrationDate?: string,
    unp?: string,
  ) {
    this.fullName = fullName || null;
    this.fullNameBel = fullNameBel || null;
    this.shortName = shortName || null;
    this.shortNameBel = shortNameBel || null;
    this.name = name || null;
    this.nameBel = nameBel || null;
    this.registrationDate = registrationDate || null;
    this.unp = unp || null;
  }
}

export class CompanyPerson {
  responsiblePerson?: string;
  basis?: string;

  constructor(responsiblePerson?: string, basis?: string) {
    this.responsiblePerson = responsiblePerson || null;
    this.basis = basis || null;
  }
}

export class VEDInfo {
  ngrn?: string;
  dfrom?: string;
  cact?: string;
  nsi00114?: {
    vkvdn: string;
    vnvdnp: string;
    nsi00114: string;
  };

  constructor(
    ngrn?: string,
    dfrom?: string,
    cact?: string,
    nsi00114?: { vkvdn: string; vnvdnp: string; nsi00114: string }
  ) {
    this.ngrn = ngrn || null;
    this.dfrom = dfrom || null;
    this.cact = cact || null;
    this.nsi00114 = nsi00114;
  }
}
