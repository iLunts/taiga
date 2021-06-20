import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
declare var Tesseract;
// import Tesseract from '';

@Component({
  selector: 'app-contractor-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class ContractorCreateComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  result: any;

  constructor() {}

  ngOnInit(): void {}

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }
  imageLoaded(): void {
    /* show cropper */
  }
  cropperReady(): void {
    /* cropper ready */
  }
  loadImageFailed(): void {
    /* show message */
  }

  // ------------- TEST OCR

  testOCR(): void {
    // Tesseract.recognize('assets/image/test.png').then(function (result) {
    //   alert(result.text);
    // });
    Tesseract.recognize('assets/image/test.png').then((result) => {
      this.result = result.text;
    });
  }

  // ngAfterViewInit(): void {
    // this.testOCR();
  // }
}
