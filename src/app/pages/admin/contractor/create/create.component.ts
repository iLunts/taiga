import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { BankAccount } from 'src/app/models/bank.model';

import { Company, Contractor } from 'src/app/models/company.model';
import { CompanyStorageService } from 'src/app/services/company-storage.service';
import { CompanyService } from 'src/app/services/company.service';
import { ContractorStorageService } from 'src/app/services/contractor-storage.service';
import { ContractorService } from 'src/app/services/contractor.service';

@Component({
  selector: 'app-contractor-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
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
          info: contractorInfo.info
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
  }

  ngOnInit(): void {
    this.valid$ = this.contractorService.checkContractorValid$();
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();

    this.actionChangeContractorInfoSubject.complete();
    this.actionChangeBankSubject.complete();
  }

  checkValid(): void {
    // this.isValid = this.companyService.isCompanyValid(this.contractor);
  }

  save(): void {
    // this.isLoading = true;
    // this.contractorService.add$(this.contractor).subscribe(() => {
    //   this.isLoading = false;
    //   this.cancel();
    // });
  }

  cancel(): void {
    this.contractorService.clearContractor();
    this.close.emit(true);
  }

  changeCompanyInfo(company: Company): void {
    this.actionChangeContractorInfoSubject.next(company);
  }

  changeBank(bank: BankAccount): void {
    debugger;
    this.actionChangeBankSubject.next(bank);
  }
}
