import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-settings-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.less']
})
export class BanksComponent implements OnInit {
  @Input() set company(company: Company) {
    this.companySubject.next(company);
  }
  private companySubject = new BehaviorSubject<Company>(null);
  company$: Observable<Company> = this.companySubject.asObservable();

  valid$: Observable<boolean>;

  constructor(private companyService: CompanyService) {
    // this.valid$ = this.company$.pipe(
    //   filter((company) => !!company),
    //   switchMap((company) =>
    //     this.companyService.checkCompanyBankValid$(company)
    //   )
    // );
  }

  ngOnInit(): void {}
}
