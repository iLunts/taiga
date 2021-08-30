import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyComponent implements OnInit {
  company: Company;
  company$: Observable<Company[]>;
  isCompanyValid: boolean;

  constructor(private companyService: CompanyService, private router: Router) {
    this.getProfileCompany$();
  }

  ngOnInit(): void {
    this.companyService.getCompanyState$().subscribe((company: Company) => {
      this.company = company;
      this.isCompanyValid = this.companyService.isCompanyValid(this.company);
    });
  }

  save(): void {
    this.companyService.add$(this.company).subscribe((response) => {
      this.router.navigate([environment.routing.admin.settings.main]);
    });
  }

  getProfileCompany$(): void {
    this.company$ = this.companyService.getProfileCompany$();
  }
}
