import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LeftMenuComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    LeftMenuComponent,
  ]
})
export class ComponentsModule { }
