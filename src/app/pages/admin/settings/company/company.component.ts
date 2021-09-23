import { Component, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import * as _ from 'lodash';

import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  company: Company;
  isCompanyValid: boolean;

  constructor(private companyService: CompanyService, private router: Router) {
    this.getProfileCompany$();

    this.companyService
      .getCompanyState$()
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((company: Company) => {
        this.company = company;
        this.isCompanyValid = this.companyService.isCompanyValid(this.company);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.companyService.clearCompany();
  }

  save(): void {
    if (this.company._id) {
      this.update();
    } else {
      this.companyService
        .add$(this.company)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.router.navigate([environment.routing.admin.settings.main]);
        });
    }
  }

  update(): void {
    this.companyService
      .update$(this.company._id, this.company)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate([environment.routing.admin.settings.main]);
      });
  }

  getProfileCompany$(): void {
    this.companyService
      .getProfileCompany$()
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => _.isEqual(a, b))
      )
      .subscribe((company: Company[]) => {
        if (company?.length) {
          this.company = company[0];
          this.companyService.setCompany(this.company);
        } else {
          this.company = new Company();
        }
      });
  }
}
