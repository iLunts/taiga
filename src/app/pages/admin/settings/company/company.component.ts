import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs';
import { Bank, BankAccount } from 'src/app/models/bank.model';
import { Company, CompanyInfo } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyComponent implements OnInit {
  company: Company;
  isCompanyValid: boolean;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.getCompanyState$().subscribe((company: Company) => {
      this.company = company;
      this.isCompanyValid = this.companyService.isCompanyValid(this.company);
    });
  }

  // setCompanyInfo(company: Company): void {
  //   this.company.info = company.info;
  // }

  // setCompanyBank(company: Company): void {
  //   this.company.bankAccount = company.bankAccount;
  // }

  // setCompany(company: Company): void {
  //   this.company = company;
  // }
}
