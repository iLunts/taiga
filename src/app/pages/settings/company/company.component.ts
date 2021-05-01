import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BankAccount } from 'src/app/models/bank.model';
import { Company, Contractor } from 'src/app/models/company.model';
import { FileUpload } from 'src/app/models/fileUpload.model';
import { BankService } from 'src/app/services/bank.service';
import { EgrService } from 'src/app/services/egr.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less'],
})
export class CompanyComponent implements OnInit {
  uploadedFiles$: Observable<FileUpload[]>;
  companyInfo: Company = new Company();
  bankInfo: BankAccount = new BankAccount();
  unp: string;
  bic: string;
  isCompanySelected: boolean;
  isBankSelected: boolean;

  constructor(
    private _upload: FileUploadService,
    private _egr: EgrService,
    private _bank: BankService
  ) {}

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles(): any {
    this.uploadedFiles$ = this._upload.getFiles(10).valueChanges();
  }

  getCompanyInformation(): void {
    if (this.unp) {
      this.companyInfo = this._egr.getAllByUnp(this.unp);
      this.isCompanySelected = true;
    }
  }

  getBankInformation(): void {
    if (this.bic) {
      this.bankInfo.bank = this._bank.getBankByBIC(this.bic);
      this.isBankSelected = true;
    }
  }

  getBlockStatus(mode: string): boolean {
    switch (mode) {
      case 'logotype': {
        return true;
      }
      case 'legalInformation': {
        return false;
      }
      case 'signature': {
        return false;
      }
      default: {
        return false;
      }
    }
  }

  changeCompany(): void {
    this.companyInfo = new Company();
    this.isCompanySelected = false;
  }
}
