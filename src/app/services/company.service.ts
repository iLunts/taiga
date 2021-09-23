import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { BehaviorSubject, from, Observable } from 'rxjs';
import * as _ from 'lodash';

import { AuthService } from './auth.service';
import { Company, CompanyAddress, CompanyInfo } from '../models/company.model';
import { NotificationService } from './notification.service';
import { Bank, BankAccount } from '../models/bank.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private company$ = new BehaviorSubject<Company>(new Company());
  private dbPath = '/companies';
  private companyRef: AngularFirestoreCollection<Company> = null;
  private regexSWIFT = /^[A-Z]{2}[0-9]{2}[A-Z]{4}[0-9]{20}$/;

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private notificationService: NotificationService
  ) {
    if (this.authService.isLoggedIn) {
      this.companyRef = this.afs.collection(this.dbPath, (q) =>
        q.where('_userId', '==', this.authService.getUserId())
      );
    }
  }

  getAll$(): Observable<Company[]> {
    return this.companyRef.valueChanges();
  }

  isCompanyValid(company: Company): boolean {
    if (company) {
      return (
        this.isCompanyInfoValid(company) &&
        this.isCompanyBankValid(company) &&
        this.isCompanySwiftValid(company.bankAccount.SWIFT)
      );
    } else {
      return false;
    }
  }

  isCompanyInfoValid(company: Company): boolean {
    if (company) {
      return Object.values(company.info).every(
        (info: CompanyInfo) => info !== null
      );
    } else {
      return false;
    }
  }

  isCompanyBankValid(company: Company): boolean {
    const bank = company?.bankAccount?.bank;
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

  isCompanySwiftValid(swift: string): boolean {
    return this.regexSWIFT.test(swift?.toUpperCase().replace(/\s/g, ''));
  }

  setCompany(company: Company): void {
    if (company) {
      this.company$.next(company);
    }
  }

  getCompany(): Company {
    if (this.company$.getValue()) {
      return this.company$.getValue();
    } else {
      this.setCompany(new Company());
    }
  }

  getProfileCompany$(): Observable<Company[]> {
    const companyRef: AngularFirestoreCollection<Company> = this.afs.collection(
      this.dbPath,
      (q) => q.where('_userId', '==', this.authService.getUserId())
    );
    return companyRef.valueChanges();
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

  clearCompanyBankAccount(): void {
    let company = this.getCompany();

    company.bankAccount = new BankAccount();

    this.setCompany(company);
  }

  clearCompanyBank(): void {
    let company = this.getCompany();

    company.bankAccount.bank = new Bank();

    this.setCompany(company);
  }

  clearCompanySwift(): void {
    let company = this.getCompany();
    company.bankAccount.SWIFT = null;

    this.setCompany(company);
  }

  clearMailingAddress(): void {
    let company = this.getCompany();

    company.mailingAddress = new CompanyAddress();

    this.setCompany(company);
  }

  clearCompany(): void {
    this.setCompany(new Company());
  }

  add$(company: Company): Observable<any> {
    if (!company._id) {
      company._id = this.afs.createId();
    }
    company._userId = this.authService.getUserId();
    company._createdDate = new Date().toString();

    return from(
      this.afs
        .collection(this.dbPath)
        .doc(company._id)
        .set(JSON.parse(JSON.stringify(company)))
        .then(() => {
          this.notificationService.success('Компания успешно добавлена');
        })
    );
  }

  update$(_id: string, company: any): Observable<void> {
    return from(
      this.afs
        .collection(this.dbPath)
        .doc(_id)
        .update(company)
        .then(() => {
          this.notificationService.success('Компания успешно обнавлена');
        })
    );
  }

  isJuridicalAndPostalAddressSame(company: Company): boolean {
    return _.isEqual(company.juridicalAddress, company.mailingAddress);
  }
}
