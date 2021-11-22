import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiScrollbarModule } from '@taiga-ui/core';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ContractorAsideLayoutComponent } from './contractor-aside-layout/contractor-aside-layout.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

@NgModule({
  declarations: [
    // AdminLayoutComponent,
    // ContractorAsideLayoutComponent,
    // DefaultLayoutComponent
    // AuthLayoutComponent
  ],
  imports: [CommonModule, TuiScrollbarModule],
  exports: [
    // AdminLayoutComponent,
    // ContractorAsideLayoutComponent,
    // DefaultLayoutComponent
  ]
})
export class LayoutsModule {}
