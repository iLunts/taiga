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
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
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
  // company = new Company();

  constructor(
    private egrService: EgrService,
    private companyService: CompanyService
  ) {
    // this.companyService.getCompany$().subscribe((company: Company) => {
    //   this.company = company;
    //   this.return.emit(this.company.info);
    //   this.checkValid();
    // });
  }

  ngOnInit(): void {
    this.unpControl.valueChanges
      .pipe(takeUntil(this.destroySubject), distinctUntilChanged())
      .subscribe((response: string) => {
        if (this.unpControl.valid) {
          this.getContractorInformation();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  private getContractorInformation(): void {
    this.egrService.getAllByUnp(this.unpControl.value);
  }

  private checkValid(): void {
    // this.isValidCompany = this.companyService.checkCompanyInfoValid(this.company);
  }

  clearCompanyInfo(): void {
    this.unpControl.setValue(null);
    this.companyService.clearCompanyInfo();
  }

  setCompanyInfo(companyInfo: CompanyInfo): void {
    this.onChange.emit(companyInfo);
  }
}
