import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, DefaultRoutingModule],
  exports: [PageNotFoundComponent],
})
export class DefaultModule {}
