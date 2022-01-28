import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  filter,
  map,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { BankAccount } from 'src/app/models/bank.model';
import * as _ from 'lodash';

import { Company, Contractor } from 'src/app/models/company.model';
import { ContractorService } from 'src/app/services/contractor.service';
import { ContractorStorageService } from 'src/app/services/contractor-storage.service';

@Component({
  selector: 'app-contractor-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractorCreateComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<boolean>();

  // contractor: Contractor = new Contractor();
  isValid: boolean;
  valid$: Observable<boolean>;
  isLoading = false;

  private readonly destroySubject = new Subject();
  private actionChangeContractorInfoSubject = new BehaviorSubject<Company>(
    null
  );
  private actionChangeBankSubject = new BehaviorSubject<BankAccount>(null);
  private actionChangeAddressSubject = new BehaviorSubject<Company>(null);
  private actionSaveSubject = new Subject();
  contractor$: Observable<Contractor>;

  constructor(
    private contractorService: ContractorService,
    private contractorStorageService: ContractorStorageService
  ) {
    this.contractor$ = this.contractorStorageService.contractor$;

    this.actionChangeContractorInfoSubject
      .pipe(
        filter((company: Company) => !!company),
        withLatestFrom(this.contractor$),
        map(([contractorInfo, contractor]) => ({
          ...contractor,
          _type: contractorInfo._type,
          info: contractorInfo.info,
          juridicalAddress: contractorInfo.juridicalAddress
        })),
        takeUntil(this.destroySubject)
      )
      .subscribe((contractor: Contractor) => {
        this.contractorStorageService.setContractor(contractor);
      });

    this.actionChangeBankSubject
      .pipe(
        filter((bank) => !!bank),
        withLatestFrom(this.contractor$),
        map(([bank, contractor]) => ({
          ...contractor,
          bankAccount: bank
        })),
        takeUntil(this.destroySubject)
      )
      .subscribe((contractor: Contractor) =>
        this.contractorStorageService.setContractor(contractor)
      );

    this.actionChangeAddressSubject
      .pipe(
        filter((companyAddress: Company) => !!companyAddress),
        withLatestFrom(this.contractor$),
        map(([companyAddress, contractor]) => ({
          ...contractor,
          juridicalAddress: companyAddress.juridicalAddress,
          mailingAddress: companyAddress.mailingAddress
        })),
        takeUntil(this.destroySubject)
      )
      .subscribe((contractor: Contractor) =>
        this.contractorStorageService.setContractor(contractor)
      );

    this.valid$ = this.contractorService.checkContractorValid$();

    this.actionSaveSubject
      .pipe(
        tap(() => (this.isLoading = true)),
        withLatestFrom(this.contractor$),
        switchMap(([, contractor]) => this.contractorService.add$(contractor)),
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroySubject)
      )
      .subscribe();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();

    this.actionChangeContractorInfoSubject.complete();
    this.actionChangeBankSubject.complete();
  }

  save(): void {
    this.actionSaveSubject.next();
    // this.isLoading = true;
    // this.contractorService.add$(this.contractor).subscribe(() => {
    //   this.isLoading = false;
    //   this.cancel();
    // });
  }

  cancel(): void {
    // this.contractorService.clearContractor();
    this.close.emit(true);
  }

  changeCompanyInfo(company: Company): void {
    this.actionChangeContractorInfoSubject.next(company);
  }

  changeBank(bank: BankAccount): void {
    debugger;
    this.actionChangeBankSubject.next(bank);
  }

  changeAddress(company: Company): void {
    this.actionChangeAddressSubject.next(company);
  }

  isSameMailingAddress(contractor: Company): boolean {
    if (_.some(contractor.juridicalAddress, _.isEmpty)) {
      console.log('Same: ', contractor.juridicalAddress);
      return false;
    } else {
      console.log('Compare: ', contractor.juridicalAddress);
      return _.isEqual(contractor.juridicalAddress, contractor.mailingAddress);
    }
  }
}
