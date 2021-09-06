import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  company$: Observable<Company[]>;
  isCompanyValid: boolean;

  constructor(private companyService: CompanyService, private router: Router) {
    this.getProfileCompany$();
  }

  ngOnInit(): void {
    this.companyService
      .getCompanyState$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((company: Company) => {
        this.company = company;
        this.isCompanyValid = this.companyService.isCompanyValid(this.company);
      });
  }

  save(): void {
    if (this.company._id) {
      this.update();
    } else {
      this.companyService
        .add$(this.company)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response) => {
          this.router.navigate([environment.routing.admin.settings.main]);
        });
    }
  }

  update(): void {
    this.companyService
      .update$(this.company._id, this.company)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.router.navigate([environment.routing.admin.settings.main]);
      });
  }

  getProfileCompany$(): void {
    this.company$ = this.companyService.getProfileCompany$();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.companyService.clearCompany();
  }
}
