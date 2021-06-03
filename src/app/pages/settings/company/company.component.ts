import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank, BankAccount } from 'src/app/models/bank.model';
import { Company, CompanyInfo } from 'src/app/models/company.model';
import { FileUpload } from 'src/app/models/fileUpload.model';
import { EgrService } from 'src/app/services/egr.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyComponent implements OnInit {
  uploadedFiles$: Observable<FileUpload[]>;
  companyInfo: Company = new Company();
  bankInfo: BankAccount = new BankAccount();
  unp: string;
  bic: string;
  isCompanySelected: boolean;
  isBankSelected: boolean;

  constructor(private _upload: FileUploadService, private _egr: EgrService) {}

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

  getBlockStatus(mode: string): boolean {
    switch (mode) {
      case 'logotype': {
        return true;
      }
      case 'legalInformation': {
        return this.companyInfo.isCompanyInfoValid(this.companyInfo);
      }
      case 'bank': {
        return this.companyInfo.isCompanyBankValid(this.companyInfo);
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
    this.companyInfo.info = new CompanyInfo();
    this.isCompanySelected = false;
  }

  changeBank(data: Bank): void {
    this.companyInfo.bankAccount.bank = data;
  }

  get isCompanyValid(): boolean {
    return this.companyInfo.isCompanyValid(this.companyInfo);
    // return false;
  }
}
