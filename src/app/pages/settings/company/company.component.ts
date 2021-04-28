import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contractor } from 'src/app/models/contractor.model';
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
  company: Contractor = new Contractor();

  constructor(private _upload: FileUploadService, private _egr: EgrService) {}

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles(): any {
    this.uploadedFiles$ = this._upload.getFiles(10).valueChanges();
  }

  getUNP(): void {
    this.company = this._egr.getContractorByUnp(this.unp);
  }
}
