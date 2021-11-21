import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

import { Bank } from 'src/app/models/bank.model';
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
  company$: Observable<Company> = this.companySubject.asObservable();

  private readonly destroySubject = new Subject();
  companyData: Company = new Company();
  swiftControl: FormControl = new FormControl({ value: null, disabled: true }, [
    Validators.required
  ]);
  valid$: Observable<boolean>;

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
    this.valid$ = this.company$.pipe(
      filter((company: Company) => !!company),
      switchMap((company: Company) =>
        this.companyService.checkCompanyBankValid$(company)
      )
    );

    this.swiftControl.valueChanges
      .pipe(takeUntil(this.destroySubject))
      .subscribe((swiftValue: string) => {
        // if (this.companyService.checkCompanySwiftValid(swiftValue)) {
        //   this.companyData.bankAccount.SWIFT = this.swiftControl.value;
        //   this.updateCompany();
        // } else {
        //   this.companyService.clearCompanySwift();
        // }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
    // this.companyService.clearCompany();
  }

  setBank(bankInfo: Bank): void {
    if (this.company && bankInfo && bankInfo.CDBank) {
      this.companyData.bankAccount.bank = bankInfo;
    } else {
      this.companyService.clearCompanyBank();
    }
    this.companyService.setCompany(this.company);
  }

  clearBank(): void {
    this.companyService.clearCompanyBank();
  }

  updateCompany(): void {
    this.companyService.setCompany(this.company);
  }
}
