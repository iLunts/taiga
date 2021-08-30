import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Company, CompanyAddress, CompanyInfo } from '../models/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private company$ = new BehaviorSubject<Company>(new Company());

  constructor() {}

  isCompanyValid(company: Company): boolean {
    console.log('Info: ', this.isCompanyInfoValid(company));
    console.log('Bank: ', this.isCompanyBankValid(company));

    return this.isCompanyInfoValid(company) && this.isCompanyBankValid(company);
  }

  isCompanyInfoValid(company: Company): boolean {
    return Object.values(company.info).every((info) => info !== null);
  }

  isCompanyBankValid(company: Company): boolean {
    const bank = company.bankAccount?.bank;
    let status = true;

    if (
      !bank ||
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
    let company = this.getCompany();

    company.info = new CompanyInfo();
    company.juridicalAddress = new CompanyAddress();
    company.ved = null;
    company._type = null;

    this.setCompany(company);
  }
}
