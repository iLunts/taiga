import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Bank } from 'src/app/models/bank.model';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-bank',
  templateUrl: './company-bank.component.html',
  styleUrls: ['./company-bank.component.less'],
})
export class CompanyBankComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  company: Company = new Company();
  isValidBank: boolean;
  swiftControl: FormControl = new FormControl({ value: null, disabled: true }, [
    Validators.required,
    Validators.minLength(34),
    Validators.maxLength(34),
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
      /\d/,
    ],
  };

  constructor(private companyService: CompanyService) {
    this.companyService
      .getCompanyState$()
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.swiftControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.swiftControl.valid) {
          this.company.bankAccount.SWIFT = this.swiftControl.value;
          this.updateCompany();
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.companyService.clearCompany();
  }

  changeBank(bankInfo: Bank): void {
    if (this.company && bankInfo && bankInfo.CDBank) {
      this.company.bankAccount.bank = bankInfo;
    } else {
      this.companyService.clearCompanyBank();
    }

    this.companyService.setCompany(this.company);
    this.checkValid();
  }

  private checkValid(): void {
    this.isValidBank = this.companyService.isCompanyBankValid(this.company);

    if (this.isValidBank) {
      this.swiftControl.enable();
    } else {
      this.swiftControl.disable();
    }
  }

  updateCompany(): void {
    this.companyService.setCompany(this.company);
  }
}
