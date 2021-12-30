import { BehaviorSubject, Observable } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';

import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-settings-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.less']
})
export class InformationComponent implements OnInit, OnDestroy {
  @Input() set company(company: Company) {
    this.companySubject.next(company);
  }
  private companySubject = new BehaviorSubject<Company>(null);
  company$: Observable<Company> = this.companySubject.asObservable();
  valid$: Observable<boolean>;

  constructor(private companyService: CompanyService) {
    this.valid$ = this.company$.pipe(
      filter((company) => !!company),
      switchMap((company) =>
        this.companyService.checkCompanyInfoValid$(company)
      )
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.companySubject.complete();
  }
}
