import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderComponent } from './uploader.component';
import { UploaderDropZoneDirective } from './uploader-drop-zone.directive';
import { UploaderTaskComponent } from './uploader-task/uploader-task.component';

@NgModule({
  declarations: [UploaderComponent, UploaderDropZoneDirective, UploaderTaskComponent],
  imports: [
    CommonModule
  ],
  exports: [UploaderComponent, UploaderDropZoneDirective, UploaderTaskComponent],
})
export class UploaderModule { }
