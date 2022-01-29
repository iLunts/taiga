import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

import { Company, ResponsiblePerson } from 'src/app/models/company.model';
import { CompanyStorageService } from 'src/app/services/company-storage.service';
import {
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';

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

  private destroySubject = new Subject();
  private actionSetResponsiblePerson = new ReplaySubject<ResponsiblePerson>(1);
  company$: Observable<Company> = this.companySubject.asObservable();
  valid$: Observable<boolean>;

  constructor(private companyStorageService: CompanyStorageService) {
    this.valid$ = this.companySubject.pipe(
      filter((company) => !!company),
      distinctUntilChanged(
        (a, b) =>
          JSON.stringify(a.responsiblePerson) ===
          JSON.stringify(b.responsiblePerson)
      ),
      switchMap((company) =>
        this.companyStorageService.checkResponsiblePersonValid$(company)
      ),
      takeUntil(this.destroySubject)
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();

    this.companySubject.complete();
    this.actionSetResponsiblePerson.complete();
  }

  setResponsiblePerson(company: Company): void {
    this.onChange.emit(company);
    // this.valid$ =
    //   this.companyStorageService.checkResponsiblePersonValid$(company);
  }
}
