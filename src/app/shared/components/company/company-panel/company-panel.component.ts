import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { Company, CompanyInfo } from 'src/app/models/company.model';

@Component({
  selector: 'app-company-panel',
  templateUrl: './company-panel.component.html',
  styleUrls: ['./company-panel.component.less']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyPanelComponent implements OnInit {
  @Input() set company(company: Company) {
    this.companySubject.next(company);
  }
  private companySubject = new BehaviorSubject<Company>(null);
  company$: Observable<Company> = this.companySubject.asObservable().pipe(
    filter((company) => !!company),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
  );
  private actionCompanySubject = new BehaviorSubject<CompanyInfo>(null);
  private readonly destroySubject = new Subject();

  @Input() isLoaded: boolean;
  @Input() canChange: boolean;
  @Output() onChange = new EventEmitter<CompanyInfo>();

  constructor() {
    this.actionCompanySubject
      .pipe(
        filter((companyInfo: CompanyInfo) => !!companyInfo),
        takeUntil(this.destroySubject)
      )
      .subscribe((companyInfo: CompanyInfo) => this.onChange.emit(companyInfo));
  }

  ngOnInit(): void {}

  clearCompanyUnp(): void {
    this.actionCompanySubject.next(new CompanyInfo());
  }
}
