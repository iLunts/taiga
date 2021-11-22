import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiBreadcrumbsModule } from '@taiga-ui/kit';

import { BreadcrumbsComponent } from './breadcrumbs.component';

@NgModule({
  declarations: [BreadcrumbsComponent],
  imports: [CommonModule, TuiBreadcrumbsModule],
  exports: [BreadcrumbsComponent]
})
export class BreadcrumbsModule {}
