import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiButtonModule, TuiNotificationModule } from '@taiga-ui/core';

import { TopMenuComponent } from './top-menu.component';

@NgModule({
  declarations: [TopMenuComponent],
  imports: [CommonModule, RouterModule, TuiButtonModule, TuiNotificationModule],
  exports: [TopMenuComponent]
})
export class TopMenuModule {}
