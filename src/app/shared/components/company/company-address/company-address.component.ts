import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-address',
  templateUrl: './company-address.component.html',
  styleUrls: ['./company-address.component.less'],
})
export class CompanyAddressComponent implements OnInit, OnDestroy {
  @Output() return = new EventEmitter<Company>();

  private readonly destroy$ = new Subject();
  company: Company = new Company();
  isValidCompany: boolean;
  samePostMail: FormControl = new FormControl({ value: false, disabled: true });

  constructor(private companyService: CompanyService) {
    this.companyService
      .getCompanyState$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((company: Company) => {
        this.company = company;
        // this.return.emit(this.company.info);
        this.checkValid();
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.companyService.clearCompany();
  }

  changePostAddress(): void {
    if (this.samePostMail.value) {
      this.company.mailingAddress = this.company.juridicalAddress;
      this.companyService.setCompany(this.company);
    } else {
      this.companyService.clearMailingAddress();
    }
  }

  private checkValid(): void {
    this.isValidCompany = this.companyService.isCompanyInfoValid(this.company);

    if (this.isValidCompany) {
      this.samePostMail.enable();
    } else {
      this.samePostMail.disable();
    }
  }
}
