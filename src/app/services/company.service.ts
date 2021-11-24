import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  from,
  Observable,
  of,
  Subject
} from 'rxjs';
import * as _ from 'lodash';

import { AuthService } from './auth.service';
import { Company, CompanyAddress, CompanyInfo } from '../models/company.model';
import { NotificationService } from './notification.service';
import { Bank, BankAccount } from '../models/bank.model';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private dbPath = '/companies';
  private companyRef: AngularFirestoreCollection<Company> = null;
  private regexSWIFT = /^[A-Z]{2}[0-9]{2}[A-Z]{4}[0-9]{20}$/;
  private companySubject = new BehaviorSubject<Company>(new Company());
  // private companySubject = new Subject<Company>();
  company$: Observable<Company> = this.companySubject.asObservable();

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private notificationService: NotificationService
  ) {
    if (this.authService.isLoggedIn) {
      this.companyRef = this.afs.collection(this.dbPath, (q) =>
        q.where('_userId', '==', this.authService.getUserId())
      );

      this.company$ = this.getProfileCompany$().pipe(
        tap((data) => console.log('Constr - getProfile: ', data))
      );

      this.setCompanyToLocalStorage();
    }
  }

  getAll$(): Observable<Company[]> {
    return this.companyRef.valueChanges();
  }

  checkCompanyValid(company: Company): boolean {
    if (company) {
      return (
        this.checkCompanyInfoValid(company) &&
        this.checkCompanyBankValid(company) &&
        this.checkCompanySwiftValid(company.bankAccount.SWIFT)
      );
    } else {
      return false;
    }
  }

  checkCompanyValid$(): Observable<boolean> {
    return this.company$.pipe(
      filter((company) => !!company),
      switchMap((company: Company) =>
        forkJoin(
          this.checkCompanyInfoValid$(company),
          this.checkCompanyBankValid$(company),
          this.checkCompanySwiftValid$(company.bankAccount.SWIFT)
        ).pipe(map(([a, b]) => a && b))
      )
    );
  }

  checkCompanyInfoValid(company: Company): boolean {
    return Object.values(company.info).every(
      (info: CompanyInfo) => info !== null
    );
  }

  checkCompanyInfoValid$(company: Company): Observable<boolean> {
    return of(
      Object.values(company.info).every((info: CompanyInfo) => info !== null)
    );
  }

  checkCompanyBankValid(company: Company): boolean {
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

  checkCompanyBankValid$(company: Company): Observable<boolean> {
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

    console.log('Update valid: ', status);

    return of(status);
  }

  checkCompanySwiftValid(swift: string): boolean {
    return this.regexSWIFT.test(swift?.toUpperCase().replace(/\s/g, ''));
  }

  checkCompanySwiftValid$(swift: string): Observable<boolean> {
    return of(this.regexSWIFT.test(swift?.toUpperCase().replace(/\s/g, '')));
  }

  setCompany(company: Company): void {
    this.companySubject.next(company);
  }

  getCompany(): Company {
    // TODO: Need rewrite to Observable !!!
    // if (this.companySubject.getValue()) {
    //   return this.companySubject.getValue();
    // } else {
    //   this.setCompany(new Company());
    // }
    if (!this.companySubject.getValue()) {
      this.setCompany(new Company());
    }
    return this.companySubject.getValue();
  }

  getProfileCompany$(): Observable<Company> {
    const companyRef: AngularFirestoreCollection<Company> = this.afs.collection(
      this.dbPath,
      (q) => q.where('_userId', '==', this.authService.getUserId())
    );
    return companyRef.valueChanges().pipe(
      first(),
      map(([company]) => company),
      tap((company: Company) => this.companySubject.next(company))
    ) as Observable<Company>;
  }

  getCompany$(): Observable<Company> {
    return this.companySubject.asObservable();
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

  isCompanyEmpty(): boolean {
    return this.checkCompanyValid(this.getCompany());
  }

  get isCompanyNotEmpty(): boolean {
    const company = JSON.parse(localStorage.getItem('company')) || null;
    return company !== null ? true : false;
  }

  setCompanyToLocalStorage(): void {
    localStorage.setItem(
      'company',
      JSON.stringify(this.companySubject.getValue())
    );
  }

  getCompanyFromLocalStorage(): Company {
    return JSON.parse(localStorage.getItem('company')) || null;
  }
}
