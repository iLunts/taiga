import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

import { Bank, BankAccount } from 'src/app/models/bank.model';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-bank',
  templateUrl: './company-bank.component.html',
  styleUrls: ['./company-bank.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyBankComponent implements OnInit, OnDestroy {
  @Input() set company(company: Company) {
    this.companySubject.next(company);
    console.log('CompanyBankComponent send company: ', company);
  }

  @Output() onChange = new EventEmitter<BankAccount>();

  private companySubject = new BehaviorSubject<Company>(null);
  private companyBankSubject = new BehaviorSubject<BankAccount>(null);
  private actionChangeBankSubject = new BehaviorSubject<Bank>(null);

  private readonly destroySubject = new Subject();
  company$: Observable<Company> = this.companySubject.asObservable();
  valid$: Observable<boolean>;
  validBank$: Observable<boolean>;

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

    this.companySubject
      .pipe(
        filter((company: Company) => !!company),
        takeUntil(this.destroySubject)
      )
      .subscribe((company: Company) => {
        this.swiftControl.patchValue(company.bankAccount.SWIFT);
        this.actionChangeBankSubject.next(company.bankAccount.bank);
      });

    this.validBank$ = this.company$.pipe(
      filter((company: Company) => !!company),
      switchMap((company: Company) =>
        this.companyService.checkCompanyBankValid$(company)
      ),
      tap((status) => this.toggleBankDisable(status))
    );

    const swiftValueChanges$ = this.swiftControl.valueChanges.pipe(
      filter((data) => !!data),
      distinctUntilChanged((a, b) => a === b)
    );

    const actionChangeBank$ = this.actionChangeBankSubject.pipe(
      filter((bank: Bank) => !!bank),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    );

    combineLatest([actionChangeBank$, swiftValueChanges$])
      .pipe(
        map(([bank, swift]) => new BankAccount(bank, swift)),
        takeUntil(this.destroySubject)
      )
      .subscribe((bankAccount: BankAccount) => {
        this.onChange.emit(bankAccount);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();

    this.companySubject.complete();
    this.companyBankSubject.complete();
    this.actionChangeBankSubject.complete();
  }

  toggleBankDisable(status: boolean): void {
    status ? this.swiftControl.enable() : this.swiftControl.disable();
  }

  setBank(bank: Bank): void {
    this.actionChangeBankSubject.next(bank);
  }

  clearBank(bank: Bank): void {
    this.swiftControl.setValue(null);
    this.actionChangeBankSubject.next(bank);
  }
}
