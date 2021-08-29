import { ThrowStmt } from '@angular/compiler';
import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Company,
  CompanyAddress,
  CompanyInfo,
} from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { EgrService } from 'src/app/services/egr.service';

@Component({
  selector: 'app-company-settings-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.less'],
})
export class InformationComponent implements OnInit {
  @Input() set company(value: Company) {
    this._company = value;
  }
  get company(): Company {
    return this._company;
  }
  private _company: Company;

  @Output() returnCompany = new EventEmitter<Company>();

  isCompanySelected: boolean;
  isValid: boolean;
  unp = new FormControl(null);

  constructor(
    private egrService: EgrService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.companyService.getCompanyState$().subscribe((company: Company) => {
      this.isCompanySelected = this.companyService.isCompanyInfoValid(company);
    });
  }

  getCompanyInformation(): Company {
    if (this.unp.value) {
      this.egrService.getAllByUnp(this.unp.value);

      if (this.isValid) {
        this.isCompanySelected = true;
      }
    }
    this.returnCompany.emit(this.company);
    return this.company;
  }

  changeCompany(): void {
    this.companyService.clearCompanyInfo();
    this.unp.setValue(null);
    this.isCompanySelected = false;
  }

  checkCompanyValid(company: Company): void {
    this.isValid = this.companyService.isCompanyInfoValid(company);
    if (this.isValid) {
      this.isCompanySelected = true;
    }
  }
}
