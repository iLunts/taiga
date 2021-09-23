import { Component, Input, OnInit } from '@angular/core';

import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-settings-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.less'],
})
export class InformationComponent implements OnInit {
  @Input() set company(company: Company) {
    this._company = company;
    this.checkValid();
  }
  get company(): Company {
    return this._company;
  }
  private _company: Company;

  isValid: boolean;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {}

  checkValid(): void {
    this.isValid = this.companyService.isCompanyInfoValid(this.company);
  }
}
