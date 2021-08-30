import { Component, Input, OnInit } from '@angular/core';
import { Bank } from 'src/app/models/bank.model';

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
      this.companyService.setCompany(this._company);
      this.checkValid();
    } else {
      this._company = this.companyService.getCompany();
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
      this.checkValid();
    });
  }

  changeBank(bankInfo: Bank): void {
    if (this.company && bankInfo && bankInfo.CDBank) {
      this.company.bankAccount.bank = bankInfo;
    } else {
      this.companyService.clearCompanyBank();
    }

    this.companyService.setCompany(this.company);
    this.checkValid();
  }

  checkValid(): void {
    this.isValid = this.companyService.isCompanyBankValid(this.company);
    if (this.isValid) {
      this.isBankSelected = true;
    } else {
      this.isBankSelected = false;
    }
  }
}
