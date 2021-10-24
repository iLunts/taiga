import { Component } from '@angular/core';
import { FileUpload } from 'src/app/models/fileUpload.model';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.less'],
})
export class UploaderComponent {
  isHovering: boolean;
  files: File[] = [];

  constructor(private fileUploadService: FileUploadService) {}

  toggleHover(event: boolean): void {
    this.isHovering = event;
  }

  onDrop(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));

      const fileUpload: FileUpload = new FileUpload(this.files[0]);
      this.fileUploadService.pushFileToStorage(fileUpload);
    }
  }
}
