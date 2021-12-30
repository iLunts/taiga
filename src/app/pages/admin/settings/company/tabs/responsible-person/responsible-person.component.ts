import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

import { Company, ResponsiblePerson } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-responsible-person',
  templateUrl: './responsible-person.component.html',
  styleUrls: ['./responsible-person.component.less']
})
export class ResponsiblePersonComponent implements OnInit, OnDestroy {
  @Input() set company(company: Company) {
    this.companySubject.next(company);
  }
  private companySubject = new BehaviorSubject<Company>(null);
  private actionSetResponsiblePerson = new ReplaySubject<ResponsiblePerson>(1);
  company$: Observable<Company> = this.companySubject.asObservable();
  valid$: Observable<boolean>;

  constructor(private companyService: CompanyService) {
    this.valid$ = this.company$.pipe(
      filter((company) => !!company),
      switchMap((company) =>
        this.companyService.checkCompanyInfoValid$(company)
      )
    );

    // this.actionSetResponsiblePerson.pipe(
    //   distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    //   switchMap((responsiblePerson) =>
    //     this.companyService.updateResponsiblePerson(responsiblePerson)
    //   )
    // );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.companySubject.complete();
    this.actionSetResponsiblePerson.complete();
  }

  setResponsiblePerson(data): void {
    // this.companyService.updateResponsiblePerson(data);
  }
}
