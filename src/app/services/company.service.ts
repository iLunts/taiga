import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { BehaviorSubject, from, Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { Company, CompanyAddress, CompanyInfo } from '../models/company.model';
import { NotificationService } from './notification.service';
import { Bank, BankAccount } from '../models/bank.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private company$ = new BehaviorSubject<Company>(new Company());
  private dbPath = '/companies';

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private notificationService: NotificationService
  ) {}

  isCompanyValid(company: Company): boolean {
    if (company) {
      return (
        this.isCompanyInfoValid(company) && this.isCompanyBankValid(company)
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
}
