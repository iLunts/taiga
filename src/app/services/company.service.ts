import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Company, CompanyAddress, CompanyInfo } from '../models/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private company$ = new BehaviorSubject<Company>(new Company());

  constructor() {}

  // isCompanyValid(company: Company): boolean {
  //   return Object.values(company).every((c) => c !== null);
  // }

  isCompanyValid(company: Company): boolean {
    return (
      Object.values(company.info).every((c) => c !== null) &&
      this.isCompanyBankValid(company)
    );
  }

  isCompanyInfoValid(company: Company): boolean {
    console.log(
      'isCompanyInfoValid: ',
      Object.values(company.info).every((c) => c !== null)
    );

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

  setCompany(company: Company): void {
    this.company$.next(company);
  }

  getCompany(): Company {
    return this.company$.getValue();
  }

  getCompanyState$(): Observable<Company> {
    return this.company$.asObservable();
  }

  clearCompanyInfo(): void {
    const company = this.getCompany();

    company.info = new CompanyInfo();
    company.juridicalAddress = new CompanyAddress();
    company.ved = null;
    company._type = null;

    this.setCompany(company);
  }
}
