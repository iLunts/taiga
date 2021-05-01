import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Company, Contractor } from 'src/app/models/company.model';
import { FileUpload } from 'src/app/models/fileUpload.model';
import { EgrService } from 'src/app/services/egr.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less'],
})
export class CompanyComponent implements OnInit {
  uploadedFiles$: Observable<FileUpload[]>;
  unp: string;
  company: Company = new Company();
  isCompanySelected: boolean;

  constructor(private _upload: FileUploadService, private _egr: EgrService) {}

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles(): any {
    this.uploadedFiles$ = this._upload.getFiles(10).valueChanges();
  }

  getUNP(): void {
    if (this.unp) {
      this.company = this._egr.getAllByUnp(this.unp);
      this.isCompanySelected = true;
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
    this.company = new Company();
    this.isCompanySelected = false;
  }
}
