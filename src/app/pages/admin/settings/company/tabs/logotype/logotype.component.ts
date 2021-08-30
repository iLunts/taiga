import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models/company.model';
import { FileUpload } from 'src/app/models/fileUpload.model';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-company-settings-logotype',
  templateUrl: './logotype.component.html',
  styleUrls: ['./logotype.component.less'],
})
export class LogotypeComponent implements OnInit {
  @Input() set company(value: any) {
    if (value?.length) {
      this._company = value;
    } else {
      this._company = null;
    }
  }
  get company(): any {
    return this._company;
  }
  private _company: Company;

  uploadedFiles$: Observable<FileUpload[]>;

  constructor(private uploadService: FileUploadService) {}

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles(): any {
    this.uploadedFiles$ = this.uploadService.getFiles(10).valueChanges();
  }
}
