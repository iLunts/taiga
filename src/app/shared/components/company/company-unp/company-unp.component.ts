import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';
import { Company, CompanyInfo } from 'src/app/models/company.model';

import { CompanyService } from 'src/app/services/company.service';
import { EgrService } from 'src/app/services/egr.service';

@Component({
  selector: 'app-company-unp',
  templateUrl: './company-unp.component.html',
  styleUrls: ['./company-unp.component.less']
})
export class CompanyUnpComponent implements OnInit, OnDestroy {
  @Input() set company(company: Company) {
    this.companySubject.next(company);
  }
  private companySubject = new BehaviorSubject<Company>(null);
  company$: Observable<Company> = this.companySubject.asObservable();

  @Input() canChange: boolean;

  @Output() onChange = new EventEmitter<CompanyInfo>();

  isValidCompany: boolean;
  unpControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(9),
    Validators.maxLength(9)
  ]);
  destroySubject: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private egrService: EgrService,
    private companyService: CompanyService
  ) {
    this.unpControl.valueChanges
      .pipe(
        filter(() => this.unpControl.valid),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((unp: string) => this.egrService.getAllByUnp$(unp)),
        takeUntil(this.destroySubject)
      )
      .subscribe((company) => {
        this.companySubject.next(company);
        this.setCompanyInfo(company.info);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  clearCompanyInfo(): void {
    this.unpControl.setValue(null);
    this.companyService.clearCompanyInfo();
  }

  setCompanyInfo(companyInfo: CompanyInfo): void {
    this.onChange.emit(companyInfo);
  }
}
