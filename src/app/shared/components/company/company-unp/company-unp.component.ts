import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Company, CompanyInfo } from 'src/app/models/company.model';

import { CompanyService } from 'src/app/services/company.service';
import { EgrService } from 'src/app/services/egr.service';

@Component({
  selector: 'app-company-unp',
  templateUrl: './company-unp.component.html',
  styleUrls: ['./company-unp.component.less'],
})
export class CompanyUnpComponent implements OnInit, OnDestroy {
  @Output() return = new EventEmitter<CompanyInfo>();

  isValidCompany: boolean;
  unpControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(9),
    Validators.maxLength(9),
  ]);
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);
  company = new Company();

  constructor(
    private egrService: EgrService,
    private companyService: CompanyService
  ) {
    this.companyService.getCompanyState$().subscribe((company: Company) => {
      this.company = company;
      this.return.emit(this.company.info);
      this.checkValid();
    });
  }

  ngOnInit(): void {
    this.unpControl.valueChanges
      .pipe(takeUntil(this.destroy), distinctUntilChanged())
      .subscribe((response: string) => {
        if (this.unpControl.valid) {
          this.getContractorInformation();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  private getContractorInformation(): void {
    this.egrService.getAllByUnp(this.unpControl.value);
  }

  private checkValid(): void {
    this.isValidCompany = this.companyService.isCompanyInfoValid(this.company);
  }

  clearCompanyInfo(): void {
    this.unpControl.setValue(null);
    this.companyService.clearCompanyInfo();
  }
}
