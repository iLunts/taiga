import { Injectable, OnDestroy } from '@angular/core';
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
import {
  distinctUntilChanged,
  filter,
  first,
  map,
  shareReplay,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService implements OnDestroy {
  private dbPath = '/companies';
  private companyRef: AngularFirestoreCollection<Company> = null;
  private regexSWIFT = /^[A-Z]{2}[0-9]{2}[A-Z]{4}[0-9]{20}$/;
  private companySubject = new BehaviorSubject<Company>(new Company());
  private readonly destroySubject = new Subject();
  company$: Observable<Company> = this.companySubject.asObservable();

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private notificationService: NotificationService
  ) {
    if (this.authService.isLoggedIn) {
      // TODO: Нужно проверить будут ли меняться данные, при повторном выхове сервиса в конструкторе другого компонента
      const company$ = this.getProfileCompany$();

      company$
        .pipe(
          filter((company: Company) => !!company),
          tap((company: Company) => this.companySubject.next(company)),
          takeUntil(this.destroySubject)
        )
        .subscribe();
    } else {
      this.clearCompanyFromLocalStorage();
    }
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  checkCompanyValid(company: Company): boolean {
    if (company) {
      // return (
      //   this.checkCompanyInfoValid(company) &&
      //   this.checkCompanyBankValid(company) &&
      //   this.checkCompanySwiftValid(company.bankAccount.SWIFT)
      // );
    } else {
      return false;
    }
  }

  checkCompanyValid$(): Observable<boolean> {
    // return this.company$.pipe(
    //   filter((company) => !!company),
    //   switchMap((company: Company) =>
    //     forkJoin().pipe(map(([a, b]) => a && b))
    //     // this.checkCompanyInfoValid$(company),
    //     // this.checkCompanyBankValid$(company),
    //     // this.checkCompanySwiftValid$(company.bankAccount.SWIFT)
    //   )
    // );
    return of(false);
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

    console.warn('checkCompanyBankValid$: ', company);

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

  getCompany$(): Observable<Company> {
    return this.company$;
  }

  getCompanyValue(): Company {
    return this.companySubject.getValue();
  }

  getProfileCompany$(): Observable<Company> {
    const companyRef: AngularFirestoreCollection<Company> = this.afs.collection(
      this.dbPath,
      (q) => q.where('_userId', '==', this.authService.getUserId())
    );

    const company$ = companyRef.valueChanges().pipe(
      first(),
      map(([company]) => company),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      tap((company: Company) => {
        this.companySubject.next(company);
        this.setCompanyToLocalStorage(company);
      }),
      // shareReplay()
      takeUntil(this.destroySubject)
    );

    return company$;
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
    const company$ = this.getCompany$();
    company$
      .pipe(
        filter((company) => !!company),
        distinctUntilChanged(),
        map((company: Company) => ({
          ...company,
          bankAccount: new BankAccount()
        })),
        tap((company) => {
          this.setCompany(company);
        }),
        takeUntil(this.destroySubject)
      )
      .subscribe();
  }

  clearCompanyBank(): void {
    // TODO: нужно сделать merge() и уже внутри rxjs обновлять конкретные данные и прослушивать все изменения
    let company = this.getCompany();

    company.bankAccount.bank = new Bank();

    this.setCompany(company);

    // this.actionClearCompanyBankSubject.next(null);
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

  setCompanyToLocalStorage(company?: Company): void {
    localStorage.setItem(
      'company',
      company
        ? JSON.stringify(company)
        : JSON.stringify(this.companySubject.getValue())
    );
  }

  getCompanyFromLocalStorage(): Company {
    return JSON.parse(localStorage.getItem('company')) || null;
  }

  clearCompanyFromLocalStorage(): void {
    localStorage.removeItem('company');
  }
}
