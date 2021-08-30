import { Component, Input, OnInit } from '@angular/core';

import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-settings-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.less'],
})
export class BanksComponent implements OnInit {
  @Input() set company(value: any) {
    if (value?.length) {
      this._company = value[0];
      this.checkCompanyValid();
    } else {
      this._company = null;
    }
  }
  get company(): any {
    return this._company;
  }
  private _company: Company;

  isBankSelected: boolean;
  isValid: boolean;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.getCompanyState$().subscribe((company: Company) => {
      this.company = company;
      this.checkCompanyValid();
    });
  }

  changeBank(bankInfo): void {
    this.company.bankAccount.bank = bankInfo;
    this.companyService.setCompany(this.company);
  }

  checkCompanyValid(): void {
    this.isValid = this.companyService.isCompanyBankValid(this.company);
    if (this.isValid) {
      this.isBankSelected = true;
    }
  }
}
