import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-company-settings-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.less'],
})
export class BanksComponent implements OnInit {
  @Input() set company(value: Company) {
    this._company = value;
  }
  get company(): Company {
    return this._company;
  }
  private _company: Company;

  @Output() returnCompany = new EventEmitter<Company>();

  isBankSelected: boolean;
  isValid: boolean;

  constructor() {}

  ngOnInit(): void {}

  changeBank(bankInfo): void {
    console.log('Bank: ', bankInfo);

    this.company.bankAccount = bankInfo;
    this.returnCompany.emit(this.company);
  }
}
