import { Component, OnInit } from '@angular/core';

import { FileUpload } from 'src/app/models/fileUpload.model';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.less'],
})
export class UploadImageComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;

  constructor(private _upload: FileUploadService) {}

  ngOnInit(): void {}

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  clearFile(): void {
    this.selectedFiles = null;
  }

  upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this._upload.pushFileToStorage(this.currentFileUpload).subscribe(
      (percentage) => {
        this.percentage = Math.round(percentage);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
