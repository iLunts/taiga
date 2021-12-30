import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-settings-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.less']
})
export class BanksComponent implements OnInit, OnDestroy {
  @Input() set company(company: Company) {
    this.companySubject.next(company);
  }
  private companySubject = new BehaviorSubject<Company>(null);
  company$: Observable<Company> = this.companySubject.asObservable();
  private readonly destroySubject = new Subject();
  valid$: Observable<boolean>;

  constructor(private companyService: CompanyService) {
    this.valid$ = this.companySubject.pipe(
      filter((company) => !!company),
      switchMap((company) =>
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
}
