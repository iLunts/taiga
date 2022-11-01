import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { BankAccount } from 'src/app/models/bank.model';

import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-settings-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.less']
})
export class BanksComponent implements OnInit, OnDestroy {
  @Input() set company(value: Company) {
    if (value) {
      this.companySubject.next(value);
    }
  }
  @Output() onChange = new EventEmitter<BankAccount>();

  private companySubject = new BehaviorSubject<Company>(null);
  private readonly destroySubject = new Subject();
  company$: Observable<Company> = this.companySubject.asObservable();
  valid$: Observable<boolean>;

  constructor(private companyService: CompanyService) {
    this.valid$ = this.companySubject.pipe(
      filter((company: Company) => !!company),
      switchMap((company: Company) =>
        this.companyService.checkCompanyBankAccountValid$(company)
      ),
      takeUntil(this.destroySubject)
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
    this.companySubject.complete();
  }

  changeBank(bank: BankAccount): void {
    this.onChange.emit(bank);
  }
}
