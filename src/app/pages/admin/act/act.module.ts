import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActRoutingModule } from './act-routing.module';
import { ActCreateComponent } from './create/create.component';
import { ActListComponent } from './list/list.component';

@NgModule({
  declarations: [ActCreateComponent, ActListComponent],
  imports: [CommonModule, ActRoutingModule],
  exports: [ActCreateComponent, ActListComponent],
})
export class ActModule {}
