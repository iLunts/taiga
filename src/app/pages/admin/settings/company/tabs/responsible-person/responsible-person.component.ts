import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

import { Company, ResponsiblePerson } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { CompanyStoreService } from 'src/app/services/company.store.service';

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

  @Output() onChange = new EventEmitter();

  private actionSetResponsiblePerson = new ReplaySubject<ResponsiblePerson>(1);
  company$: Observable<Company> = this.companySubject.asObservable();
  valid$: Observable<boolean>;

  constructor(
    private companyService: CompanyService,
    private companyStoreService: CompanyStoreService
  ) {
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
    this.onChange.emit(data);
    // this.companyService.updateResponsiblePerson(data);
  }
}
