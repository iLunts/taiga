import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  distinctUntilChanged,
  filter,
  first,
  map,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  iif,
  merge,
  Observable,
  Subject,
  zip
} from 'rxjs';
import * as _ from 'lodash';

import { Company, ResponsiblePerson } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { CompanyStore } from 'src/app/stores/company.store';
import { CompanyStoreService } from 'src/app/services/company.store.service';
import { CompanyStorageService } from 'src/app/services/company-storage.service';
import { BankAccount } from 'src/app/models/bank.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyComponent implements OnInit, OnDestroy {
  private readonly destroySubject = new Subject();
  private actionSaveSubject = new Subject<void>();
  private actionChangeBankSubject = new BehaviorSubject<BankAccount>(null);

  company$: Observable<Company>;
  valid$: Observable<boolean>;
  isCannotBeEmpty: boolean;

  constructor(
    private companyStorageService: CompanyStorageService,
    private route: ActivatedRoute
  ) {
    this.company$ = this.companyStorageService.company$;

    this.route.queryParams
      .pipe(filter((params) => params.cannotBeEmpty))
      .subscribe((params) => {
        this.isCannotBeEmpty = true;
      });

    this.actionSaveSubject
      .pipe(
        withLatestFrom(this.company$),
        filter((company) => !!company),
        switchMap(([, company]) =>
          this.companyStorageService.update$(company._id, company)
        ),
        takeUntil(this.destroySubject)
      )
      .subscribe();

    this.actionChangeBankSubject
      .pipe(
        filter((bank) => !!bank),
        withLatestFrom(this.company$),
        map(([bank, company]) => ({
          ...company,
          bankAccount: bank
        })),
        takeUntil(this.destroySubject)
      )
      .subscribe((company: Company) =>
        this.companyStorageService.setCompany(company)
      );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
    // this.companyService.clearCompany();

    this.actionSaveSubject.complete();
    this.actionChangeBankSubject.complete();
  }

  save(): void {
    this.actionSaveSubject.next();
  }

  setResponsiblePerson(company: Company): void {
    this.companyStorageService.setCompany(company);
  }

  setBank(bank: BankAccount): void {
    this.actionChangeBankSubject.next(bank);
  }
}
