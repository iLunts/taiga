import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

import { Bank, BankAccount } from 'src/app/models/bank.model';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-bank',
  templateUrl: './company-bank.component.html',
  styleUrls: ['./company-bank.component.less']
})
export class CompanyBankComponent implements OnInit, OnDestroy {
  @Input() set company(company: Company) {
    this.companySubject.next(company);
  }

  private companySubject = new BehaviorSubject<Company>(null);
  private companyBankSubject = new BehaviorSubject<BankAccount>(null);
  private readonly destroySubject = new Subject();
  // company$: Observable<Company> = new Observable<Company>();
  company$: Observable<Company> = this.companySubject.asObservable();
  valid$: Observable<boolean>;
  validBank$: Observable<boolean>;

  // companyData: Company = new Company();
  swiftControl: FormControl = new FormControl({ value: null, disabled: true }, [
    Validators.required
  ]);

  readonly swiftMask = {
    guide: false,
    mask: [
      /[A-Z]/,
      /[A-Z]/,
      /\d/,
      /\d/,
      ' ',
      /[A-Z]/,
      /[A-Z]/,
      /[A-Z]/,
      /[A-Z]/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/
    ]
  };

  constructor(private companyService: CompanyService) {
    // this.valid$ = this.company$.pipe(
    //   filter((company: Company) => !!company),
    //   switchMap((company: Company) =>
    //     this.companyService.checkCompanyBankValid$(company)
    //   )
    // );

    this.validBank$ = this.company$.pipe(
      filter((company: Company) => !!company),
      switchMap((company: Company) =>
        this.companyService.checkCompanyBankValid$(company)
      ),
      tap((status) => this.toggleBankDisable(status))
    );

    combineLatest([
      this.company$,
      this.validBank$,
      this.swiftControl.valueChanges
    ])
      .pipe(
        filter(([company, valid]) => !!company && valid),
        map(([company, valid, swift]) => ({
          ...company,
          bankAccount: {
            SWIFT: swift,
            bank: company.bankAccount.bank
          }
        })),
        takeUntil(this.destroySubject)
      )
      .subscribe((company: Company) => this.companyService.setCompany(company));

    this.company$
      .pipe(
        filter((company: Company) => !!company),
        takeUntil(this.destroySubject)
      )
      .subscribe((company: Company) => {
        this.swiftControl.setValue(company.bankAccount.SWIFT);
      });

    this.company$ = combineLatest([
      this.companySubject.asObservable(),
      this.companyBankSubject.asObservable()
    ]).pipe(
      map(([company, bank]) => ({
        ...company,
        bankAccount: bank ? bank : company.bankAccount
      })),
      tap((company: Company) => this.companyService.setCompany(company))
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();

    // this.companyService.clearCompany();
    this.companySubject.complete();
    this.companyBankSubject.complete();
  }

  toggleBankDisable(status: boolean): void {
    status ? this.swiftControl.enable() : this.swiftControl.disable();
  }

  setBank(bankInfo: Bank): void {
    if (bankInfo && bankInfo.CDBank) {
      const bankAccount: BankAccount = {
        SWIFT: null,
        bank: bankInfo
      };

      this.companyBankSubject.next(bankAccount);
      // this.company$ = this.companySubject.pipe(
      //   map((company: Company) => ({
      //     ...company,
      //     bankAccount
      //   })),
      //   tap((company: Company) => this.companyService.setCompany(company)),
      //   takeUntil(this.destroySubject)
      // );
    }
  }

  clearBank(): void {
    this.companyService.clearCompanyBankAccount();
  }

  updateCompany(): void {
    this.companyService.setCompany(this.company);
  }
}
